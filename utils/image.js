module.exports = {
    prepareObj: async (body) => {
        //Getting the link of the first image also the thumbnail
        // var firstImg = await body.content.indexOf('<img');
        // var start = await body.content.indexOf('"', firstImg)+1;
        // var end = await body.content.indexOf('>', start+5)-1;
        // var link = await body.content.substring(start, end); //don't get character = &quot; = "

        //Erasing the thumbnail from content
        // body.content.replace(body.content.substring(firstImg, end+2), '');

        let obj = {
            ...body,
        }
        return await (obj);
    }
}