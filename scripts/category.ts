import { PrismaClient } from "@prisma/client";

const db = new PrismaClient()

const main = async () => {
    try {
        const result = await db.category.createMany({
            data: [
                { "name": "Information Technology" },
                { "name": "Healthcare" },
                { "name": "Finance" },
                { "name": "Education" },
                { "name": "Engineering" },
                { "name": "Marketing" },
                { "name": "Sales" },
                { "name": "Human Resources" },
                { "name": "Customer Service" },
                { "name": "Manufacturing" },
                { "name": "Construction" },
                { "name": "Arts and Entertainment" }
            ]
        })
        console.log("Categories created.")
    } catch (error) {
        console.log(error)
    }
}

main()