const URL = require('../models/url');

async function handleGenerateShortURL(req, res) {
    const body = req.body;
    if (!body.url) return res.status(400).json({ err: "URL is required" });

    const { nanoid } = await import("nanoid");

    const shortID = nanoid(8);

    await URL.create({
        shortId: shortID, 
        redirectURL: body.url,
        visitHistory: [],
    });
     return res.render("home",{
        id:shortID
     })
}

async function handleGetAnalytics(req,res){
    const shortId=req.params.shortId;
    const result=await URL.findOne({shortId});
    return res.json({
        totalClicks:result.visitHistory.length,
        analytics:result.visitHistory
    })
}

module.exports = {
    handleGenerateShortURL,handleGetAnalytics
};
