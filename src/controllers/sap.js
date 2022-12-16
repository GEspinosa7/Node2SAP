const nodeRfc = require('node-rfc');
const pool = new nodeRfc.Pool({ connectionParameters: { dest: process.env.DEST } });

async function getSAPUserDetail(req, res) {
    const { username } = req.params;

    try {
        const client = await pool.acquire();

        const response = await client.call('BAPI_USER_GET_DETAIL', {
            USERNAME: username,
        });

        return res.status(200).json({
            UUID: response.IDENTITY.IDENTITY_UUID,
            name: response.ADDRESS.FULLNAME,
            email: response.ADDRESS.E_MAIL
        });

    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

module.exports = { getSAPUserDetail }