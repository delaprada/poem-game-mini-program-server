const Controller = require('egg').Controller;

class SearchController extends Controller {
  async getSearchResult() {
    const { ctx } = this;

    // get请求参数要从query中获取
    const { searchText } = ctx.query;
    const res = await ctx.service.search.getSearchResult(searchText);

    ctx.body = res;
  }
}

module.exports = SearchController;
