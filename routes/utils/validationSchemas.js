export const accountValidation = {
    account: {
        notEmpty:{
            errorMessage: "Account cannot be empty"
        },
        isString: {
            errorMessage: "Account must be a string"
        }
    },
    balance: {
        notEmpty:{
            errorMessage: "Balance cannot be empty"
        },
        isNumeric: {
            errorMessage: "Balance must be a numeric value"
        }
    }
}

export const categoriesValidation = {
    category: {
        notEmpty: {
            errorMessage: "Category cannot be empty"
        },
        isString: {
            errorMessage: "Category must be a string"
        }
    },
    budget: {
        isNumeric: {
            errorMessage: "Budget must be a numeric value"
        }
    }
}

export const paymentMethodsValidation = {
    payment_method: {
        notEmpty: {
            errorMessage: "Payment method cannot be empty"
        },
        isString: {
            errorMessage: "Payment method must be a string"
        }
    }
}

export const walletsValidation = {
    balance: {
        notEmpty: {
            errorMessage: "Balance cannot be empty"
        },
        isNumeric: {
            errorMessage: "Balance must be a numeric value"
        }
    }
}

export const transactionValidation = {
    transaction_type_id: {
        notEmpty: {
            errorMessage: "Transaction type ID cannot be empty"
        },
        isInt: {
            errorMessage: "Transaction type ID must be an integer"
        }
    },
    date: {
        notEmpty: {
            errorMessage: "Date cannot be empty"
        },
        isString: {
            errorMessage: "Date must be a string"
        }
    },
    description: {
        notEmpty: {
            errorMessage: "Description cannot be empty"
        },
        isString: {
            errorMessage: "Description must be a string"
        }
    },
    amount: {
        notEmpty: {
            errorMessage: "Amount cannot be empty"
        },
        isNumeric: {
            errorMessage: "Amount must be a number"
        }
    },
    category_id: {
        notEmpty: {
            errorMessage: "Category ID cannot be empty"
        },
        isInt: {
            errorMessage: "Category ID must be an integer"
        }
    }
}

export const idValidation = {
    id: {
        isInt: {
            errorMessage: "ID must be an integer"
        },
        notEmpty: {
            errorMessage: "ID cannot be empty"
        }
    }
}