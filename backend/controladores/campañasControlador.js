const db = require("../config/db");
const fs = require("fs");
const path = require("path");
const multer = require("multer");
const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: "lulo06817@gmail.com",
        pass: "bhkl iubb afws zrfo",
    },
});

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = path.resolve(__dirname, "../../frontend/public/img/campañas/");
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        const ext = file.originalname.split(".").pop();
        cb(null, `campana_${Date.now()}.${ext}`);
    },
});

const upload = multer({ storage: storage });

// Función para eliminar una imagen de la carpeta
const eliminar = async (image) => {
    try {
        const filePath = path.resolve(__dirname, `../../frontend/public/img/campañas/${image}`);
        await fs.promises.unlink(filePath);
    } catch (err) {
        console.error("Error eliminando imagen:", err);
    }
};
exports.uploadCampana = upload.single("foto");

exports.agregarCampana = (req, res) => {
    const { nom_campana, descripcion, fecha, cupos, id_docente } = req.body;
    const foto = req.file;

    if (!foto) {
        return res.status(400).send({ title: "Debe subir una foto para la campaña" });
    }

    const query =
        "INSERT INTO campañas (nom_campaña, descripcion, fecha, cupos, id_docente, imagen) VALUES (?, ?, ?, ?, ?, ?)";
    db.query(
        query,
        [nom_campana, descripcion, fecha, cupos, id_docente, foto.filename],
        (error, results) => {
            if (error) {
                console.error("Error al agregar la campaña:", error);
                res.status(500).send({ title: "Error al agregar la campaña" });
            } else {
                res.status(200).send({ title: "Campaña agregada correctamente" });
            }
        }
    );
};

exports.eliminarCampana = async (req, res) => {
    const id = req.params.id;

    try {
        // Verificar que hayan postulaciones con esa campaña
        const queryPostulaciones = "SELECT * FROM postulacion WHERE id_campaña = ?";
        const [rowsPostulaciones] = await db.promise().query(queryPostulaciones, [id]);

        if (rowsPostulaciones.length > 0) {
            return res.status(400).json({
                success: false,
                message: "No se puede eliminar la campaña porque hay postulaciones asociadas",
            });
        }

        const query = "DELETE FROM campañas WHERE id_campaña = ?";
        const [rows] = await db.promise().query(query, [id]);

        res.status(200).json({
            success: true,
            message: "Campaña eliminada correctamente",
            data: rows,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error al eliminar la campaña: " + error.message,
        });
    }
    // db.query(query, [id], (error, results) => {
    //     if (error) {
    //         console.error("Error al eliminar la campaña:", error);
    //         res.status(500).json({ error: "Error al eliminar la campaña" });
    //     } else {
    //         res.status(200).json({ message: "Campaña eliminada correctamente" });
    //     }
    // });
};

exports.actualizarCampana = (req, res) => {
    const id = req.params.id;
    const nom_campana = req.body.nom_campaña;
    const descripcion = req.body.descripcion;
    const fecha = req.body.fecha;
    const cupos = req.body.cupos;
    const id_docente = req.body.id_docente;

    const query =
        "UPDATE campañas SET nom_campaña = ?, descripcion = ?, fecha = ?, cupos = ?, id_docente = ? WHERE id_campaña = ?";
    db.query(query, [nom_campana, descripcion, fecha, cupos, id_docente, id], (error, results) => {
        if (error) {
            console.error("Error al actualizar la campaña:", error);
            res.status(500).json({ error: "Error al actualizar la campaña" });
        } else {
            res.status(200).json({ message: "Campaña actualizada correctamente" });
        }
    });
};

exports.mostrarCampanas = async (req, res) => {
    const query =
        `SELECT 
        *, 
        (SELECT COUNT(*) FROM postulacion WHERE id_campaña = campañas.id_campaña) as personas_postuladas, 
        (SELECT COUNT(*) FROM postulacion WHERE id_campaña = campañas.id_campaña and estado = 'aceptada') as personas_activas 
        FROM campañas`;
    const [rows] = await db.promise().query(query);

    res.status(200).send({
        success: true,
        message: "Campañas obtenidas correctamente",
        data: rows,
    });

    // db.query("SELECT * FROM campañas", (error, results) => {
    //     if (error) {
    //         console.error("Error al obtener las campañas:", error);
    //         res.status(500).json({ error: "Error al obtener las campañas" });
    //     } else {
    //         res.status(200).send({
    //             success: true,
    //             message: "Campañas obtenidas correctamente",
    //             data: results,
    //         });
    //     }
    // });
};

exports.mostrarCampanaNombre = (req, res) => {
    const nom_campana = `%${req.params.nom_campana}%`;
    const query = "SELECT * FROM campañas WHERE nom_campaña like ?";
    db.query(query, [nom_campana], (error, results) => {
        if (error) {
            console.error("Error al obtener la campaña:", error);
            res.status(500).json({ error: "Error al obtener la campaña" });
        } else {
            res.status(200).send(results);
        }
    });
};

exports.mostrarCampanaId = (req, res) => {
    const id = req.params.id;
    const query = "SELECT * FROM campañas WHERE id_campaña = ?";
    db.query(query, [id], (error, results) => {
        if (error) {
            console.error("Error al obtener la campaña:", error);
            res.status(500).json({ error: "Error al obtener la campaña" });
        } else {
            res.status(200).send(results);
        }
    });
};

exports.eliminarPorCupos = (req, res) => {
    const id = req.params.id;
    const query = "UPDATE campañas SET estado = 0  WHERE cupos = 0 ";
    db.query(query, [id], (error, results) => {
        if (error) {
            console.error("Error al eliminar la campaña:", error);
            res.status(500).json({ error: "Error al eliminar la campaña" });
        } else {
            res.status(200).json({ message: "Campaña eliminada correctamente" });
        }
    });
};
