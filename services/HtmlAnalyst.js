import Cheerio from "cheerio";
class HtmlAnalyst {
    momoAnalyze(htmlText){
        const data = [];
        const $ = Cheerio.load(htmlText); // 載入 body
        const list = $(".bt_2_layout_Content .contentArea .hotRankingArea ul li");
        for (let i = 0; i < list.length; i++) {
            const li = list.eq(i)
            const topTitle = li.first('.topTitle').text()
            console.log(topTitle)
        }

    }

    pttAnalyze(htmlText){
        const data = [];
        const $ = Cheerio.load(htmlText); // 載入 body
        const list = $(".r-list-container .r-ent");
        for (let i = 0; i < list.length; i++) {
            const title = list.eq(i).find('.title a').text();
            const author = list.eq(i).find('.meta .author').text();
            const date = list.eq(i).find('.meta .date').text();
            const link = list.eq(i).find('.title a').attr('href');
            data.push({ title, author, date, link });
        }
        return data

    }
    
    pttContentAnalyze(htmlText){
        const $ = Cheerio.load(htmlText); // 載入 body
        const content = $("#main-content").first();
        const article = content.find(".article-metaline")
        const push  = content.find(".push")

        const articleText = content.contents().filter(function() {
            return this.type === "text"
        }).text()

        const meta = []
        for (let i = 0; i < article.length; i++) {
            const tag = article.eq(i).find(".article-meta-tag").text()
            const value = article.eq(i).find(".article-meta-value").text()
            const obj = {
                tag,
                value
            }
            meta.push(obj)
            
        }

        const pushData = []

        for (let i = 0; i < push.length; i++) {
            const tag = push.eq(i).find(".push-tag").text()
            const userid = push.eq(i).find(".push-userid").text()
            const pushContent = push.eq(i).find(".push-content").text()
            const pushIpdatetime = push.eq(i).find(".push-ipdatetime").text()

            pushData.push({
                tag,
                userid,
                pushContent,
                pushIpdatetime                
            })
        }

        
        return {
            article: articleText,
            meta,
            push: pushData
        }

    }

}


export {
    HtmlAnalyst
}