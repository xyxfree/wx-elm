let dataPost=require('../../data/data.js');
Page({
  data: {
    dataList:[],
    curnev:0,
    total:0,
    result:[]
  },
  onLoad: function () {
    var dataList = dataPost.dataPost.goods;
    var length = dataList.length;
    dataList.forEach((item,index) =>{
      item.foods.forEach((item) =>{
        item.num = 0;//初始化每一个菜品的数量为0
      })
    });
     this.setData({
       dataList: dataList
     })
  },
  select(e){
    this.setData({
      curnev: e.target.dataset.index
    })
  },
  cursub(e){
    this.numCount(e, false)
  },
  curadd(e){
    this.numCount(e, true)
  },
  numCount(e,toggle){
    var childIndex = e.target.dataset.index;//栏目下菜品下标
    var parentIndex = this.data.curnev;//商品栏目下标
    var dataList = this.data.dataList;//所有商品数据
    var item = dataList[parentIndex].foods[childIndex];
    var price = item.price;//获取价格
    var num = item.num;//获取数量
    var total = this.data.total;//总价
    var result =[];
    if(toggle){
      num++;
      total += price;
    }else{
      if (num <= 0) return;
      num--;
      total -= price;
    }
    this.data.dataList[parentIndex].foods[childIndex].num = num;

    dataList.forEach((item) =>{
      item.foods.forEach((item) =>{
        if(item.num>0){
          result.push(item)
        }
      })
    })

    this.setData({
      total: total,
      dataList:dataList,
      result: result
    })
  },
  total(){
    var post = this.data.result;
  }
})
