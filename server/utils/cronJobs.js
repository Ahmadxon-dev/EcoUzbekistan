const Post = require("../models/Post")
const cron = require("node-cron");
// 0 0 * * *
// */5 * * * * *

function deadlineLogic(){
    cron.schedule('*/5 * * * * *', async () => {
        const tenDaysAgo = new Date(Date.now() - 10 * 24 * 60 * 60 * 1000);

        try {
            const result = await Post.updateMany(
                { createdAt: { $lte: tenDaysAgo }, areTenDaysPassed: false },
                { $set: { areTenDaysPassed: true, isDone:false} }
            );

            // console.log(`${result.modifiedCount} documents updated`);
        } catch (err) {
            console.error('Error updating documents:', err);
        }
    });
}

module.exports = deadlineLogic;
