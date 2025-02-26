const validateStudentForm = (formData) => {
    let errors = {};

    if (!formData.studentName.trim()) {
        errors.studentName = "Student name is required";
    }
    if (!formData.email.trim()) {
        errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        errors.email = "Invalid email format";
    }
    if (!formData.departmentId) {
        errors.departmentId = "Department is required";
    }

    return errors; // Return object containing error messages
};

export { validateStudentForm };
