const User = require("../models/User");
const Employee = require("../models/Employee");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const resolvers = {
    Query: {
        login: async (_, { username, email, password }) => {
            const user = await User.findOne({ $or: [{ email }, { username }] });
            if (!user) throw new Error("User not found");
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) throw new Error("Invalid credentials");
            return jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });
        },
        getAllEmployees: async () => await Employee.find(),
        searchEmployeeById: async (_, { id }) => await Employee.findById(id),
        searchEmployeeByDesignationOrDepartment: async (_, { designation, department }) => await Employee.find({ $or: [{ designation }, { department }] })
    },
    Mutation: {
        signup: async (_, { username, email, password }) => {
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = new User({ username, email, password: hashedPassword });
            return await newUser.save();
        },
        addEmployee: async (_, args) => {
            const newEmployee = new Employee(args);
            return await newEmployee.save();
        },
        updateEmployee: async (_, { id, ...updateFields }) => {
            return await Employee.findByIdAndUpdate(id, updateFields, { new: true });
        },
        deleteEmployee: async (_, { id }) => {
            await Employee.findByIdAndDelete(id);
            return "Employee deleted successfully";
        }
    }
};

module.exports = resolvers;
