const {
    getStorage,
    ref,
    uploadBytesResumable,
    getDownloadURL,
} = require('firebase/storage');
const firebaseConfig = require('../config/firebase/index'); // Import your Firebase configuration
const storage = getStorage(firebaseConfig.app);
const Mission = require('../models/Mission');
class UploadController {
    async uploadFileProof(req, res) {
        // const mission = await Mission.findById(req.params.missionId);
        const file = req.file;
        const storageRef = ref(storage, 'proof/test');
        // const storageRef = ref(storage, 'proof/' + mission._id);

        const metadata = { contentType: file.mimetype };
        const snapshot = await uploadBytesResumable(
            storageRef,
            file.buffer,
            metadata
        );
        const dowloadUrl = await getDownloadURL(snapshot.ref);
        return res.status(200).json({ dowloadUrl });
    }
}
module.exports = new UploadController();
