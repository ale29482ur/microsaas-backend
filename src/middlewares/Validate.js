export function validate(schema){
    return(req, res, next) => {
        const result = schema.safeParse(req.body)

        if(!result.success) {
            return res.status(400).json({
                message:"Dados inválidos",
                errors: result.error.issues.map((issues) => ({
                    campo: issues.path.join(" . "),
                    mensagem: issues.message,
                })),
            })
        }

        req.body = result.data
        next()
    }
}