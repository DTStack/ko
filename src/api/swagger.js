export default {
    /* -------- DT-BootX Default Index Controller -------- */
    indexUsingGet: { // 根目录Controller
        method: 'get',
        url: `/` 
    }, 

    /* -------- 智慧门店 Store Controller -------- */
    getManageOverViewDataUsingGet: { // 经营概览
        method: 'get',
        url: `/api/v1/shop/manage-overview-data` 
    }, 

    /* -------- 智慧门店 - 导购分析 Guider Analysis Controller -------- */
    getGuiderMonthRankUsingGet: { // 导购销售月排名
        method: 'get',
        url: `/api/v1/guider-analysis/month-rank` 
    }, 
    getTodaySaleUsingGet: { // 今日导购销售
        method: 'get',
        url: `/api/v1/guider-analysis/today-sale` 
    }, 

    /* -------- 智慧门店 - 引流分析 Drainage Analyse Controller -------- */
    getDrainageAnalyseDataUsingGet: { // 游戏互动人数
        method: 'get',
        url: `/api/v1/drainage-analyse/drainage-analyse-data` 
    }, 
    exportDrainageAnalyseDataUsingGet: { // 引流分析数据Excel导出
        method: 'get',
        url: `/api/v1/drainage-analyse/drainage-analyse-data/export-excel` 
    }, 
    getMutCntTrendUsingGet: { // 客流人数趋势
        method: 'get',
        url: `/api/v1/drainage-analyse/get-interactiveAmount-trend` 
    }, 
    getSaleMoneyAmountTrendUsingGet: { // 互动人数趋势
        method: 'get',
        url: `/api/v1/drainage-analyse/get-saleMoneyAmount-trend` 
    }, 

    /* -------- 智慧门店 - 热力动线 Hot Area Controller -------- */
    queryHotLineUsingPost: { // 热力动线
        method: 'post',
        url: `/api/v1/hotArea/hot-line` 
    }, 

    /* -------- 智慧门店 - 逛店分析 In Store Analysis Controller -------- */
    queryAgeDistributeUsingGet: { // 女性-年龄分布/男性-年龄分布
        method: 'get',
        url: `/api/v1/shop/in-shop-analysis/age-distribute` 
    }, 
    exportProductBuyAnalysisUsingGet: { // 商品购买分析导出
        method: 'get',
        url: `/api/v1/shop/in-shop-analysis/export-product-buy-analysis` 
    }, 
    productBuyAnalysisUsingPost: { // 商品购买分析
        method: 'post',
        url: `/api/v1/shop/in-shop-analysis/product-buy-analysis` 
    }, 

    /* -------- 智慧门店-门店信息 Store Info Controller -------- */
    getShopInfoUsingGet: { // getShopInfo
        method: 'get',
        url: `/api/v1/shop-info/shop` 
    }, 

    /* -------- 消费者概述 Cust Controller -------- */
    exportUserTagRatioUsingGet: { // 导出用户标签占比数据
        method: 'get',
        url: `/api/v1/cust/export-usertag-ratio` 
    }, 
    getAreaTreeUsingGet: { // 获取区域树
        method: 'get',
        url: `/api/v1/cust/get-area-tree` 
    }, 
    getTagClassUsingGet: { // 获取用户标签类别
        method: 'get',
        url: `/api/v1/cust/get-tags-class` 
    }, 
    getUserTagRatioUsingPost: { // 获取用户标签占比
        method: 'post',
        url: `/api/v1/cust/get-usertag-ratio` 
    }, 

    /* -------- 用户登录 User Login Controller -------- */
    userLoginUsingPost: { // 用户登录
        method: 'post',
        url: `/api/v1/user/login` 
    }, 
    userLoginOutUsingGet: { // 用户登出
        method: 'get',
        url: `/api/v1/user/login-out` 
    }, 
    getUserInfoUsingGet: { // 用户信息
        method: 'get',
        url: `/api/v1/user/user-info` 
    }, 

    /* -------- 首页看板 Board Controller -------- */
    getBoardDataUsingGet: { // 获取首页看板核心数据
        method: 'get',
        url: `/api/v1/board/get-board-data` 
    }, 
    getBoardSaleTrendUsingGet: { // 获取首页销售流水趋势
        method: 'get',
        url: `/api/v1/board/get-board-sale-trend` 
    }, 
    getBoardSSSGTrendUsingGet: { // 获取首页SSSG趋势
        method: 'get',
        url: `/api/v1/board/get-board-sssg-trend` 
    }, 

}