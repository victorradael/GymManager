const Instructor = require('../models/instructor')
const { age, date } = require('../../lib/utils')

module.exports = {
    index(req, res) {

        let { filter, page, limit } = req.query

        page = page || 1
        limit = limit || 2
        let offset = limit * (page - 1)

        const params = {
            filter,
            page,
            limit,
            offset,
            callback(instructors) {

                const pagination = {
                    total: Math.ceil(instructors[0].total / limit),
                    page
                }

                return res.render("instructors/index", { instructors, pagination, filter })
            }
        }

        Instructor.paginate(params)

    },
    show(req, res) {
        Instructor.find(req.params.id, instructor => {
            if (!instructor) return res.send('Instructor Not Found')

            instructor.age = age(instructor.birth)
            instructor.services = instructor.services.split(",")

            instructor.created_at = date(instructor.created_at).format

            return res.render("instructors/show", { instructor })
        })
    },
    create(req, res) {
        return res.render('instructors/create')
    },
    post(req, res) {
        const keys = Object.keys(req.body)

        for (key of keys) {
            if (req.body[key] == "") {
                return res.send(' Please, fill all fields!')
            }
        }

        Instructor.create(req.body, instructor => {
            return res.redirect(`/instructors/${instructor.id}`)
        })


    },
    edit(req, res) {
        Instructor.find(req.params.id, instructor => {
            if (!instructor) return res.send('Instructor Not Found')

            instructor.birth = date(instructor.birth).iso

            instructor.created_at = date(instructor.created_at).format

            return res.render("instructors/edit", { instructor })
        })
    },
    put(req, res) {
        const keys = Object.keys(req.body)

        for (key of keys) {
            if (req.body[key] == "") {
                return res.send(' Please, fill all fields!')
            }
        }

        Instructor.update(req.body, _ => {
            return res.redirect(`/instructors/${req.body.id}`)
        })
    },
    delete(req, res) {
        Instructor.delete(req.body.id, _ => {
            return res.redirect(`/instructors`)
        })
    },
}