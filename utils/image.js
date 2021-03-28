const fs = require('fs');
const path = require('path');

module.exports = {
    deleteImg: async (image) => {
        fs.unlinkSync(path.join(`${__dirname}/..`, image)); //delete image before updating it
    },
    prepareObj: async (body, image) => {
        let obj = {
            ...body,
            image: `img/${image.name}`
        }

        await image.mv(path.join(`${__dirname}/../img`,image.name)); //move uploaded image to ../img/
        return await (obj);
    }
}