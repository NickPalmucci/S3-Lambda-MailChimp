import htmlParser from 'htmlparser2';
let contentId;
let contentTitle;

const parser = new htmlParser.Parser({
    onopentag: (name, attribs) => {
        if (name === 'tsdata') {
            contentId = attribs.contentid;
            contentTitle = attribs.contenttitle;
            return {contentId, contentTitle}

        }
    }
});

export const parse = (html) => {
   parser.write(html);
   parser.end();
   return {contentId, contentTitle}
};
