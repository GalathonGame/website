module.exports = {
    convertToText: async(text) => {
        return text.replace(/<p class="p-post">/g, '').replace(/<\/?p[^>]*>/g, '\n').slice(0, -1);
    },
    convertToHTML: (text) => {
        var start = 0;
        while (text.indexOf('<img', start) != -1) {
            var index = text.indexOf('<img', start)-1;
            text = text.substring(0, index) + '</p>' + text.substring(index+1, text.length)
            start = index + 10;
        }
        return ('<p class="p-post">' + text.replace(/\n/g, '</p><p class="p-post">')+ '</p>');
    }
}