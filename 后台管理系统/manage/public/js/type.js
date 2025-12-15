$('.add-btn').click(function () {

  console.log('添加商品类型');
  
  $('.add-type-box').slideDown(350);

})

$('.cancel').click(function () {
  $('.add-type-box').slideUp(350);
})

//添加商品类型
$('.commit').click(function () {

  var typeValue = $('#type').val();
  // console.log('typeValue ==> ', typeValue);

  // console.log('data ==> ', data);
  

  // return;

  if (!typeValue) {
    alert('请输入商品类型');
    return;
  }

  //发起添加商品类型请求
  $.ajax({
    type: 'post',
    url: 'http://127.0.0.1:7001/bAddType',
    data: {
      type: typeValue,
      token: localStorage.getItem('token'),
      manage: 1
    },
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    success: function (res) {
      console.log('添加商品类型 res ==> ', res);

      alert(res.msg);

      if (res.code == 700) {
        
        //如果未登录, 则跳转到登录页面
        location.href = '/';
      } else {
        //关闭弹窗
        $('.add-type-box').slideUp(350);
        $('#type').val('');
        location.reload();
      }

      
    },
    fail: function (err) {
      console.log('err ==> ', err);
      
    }
  })
  

})


$('#prom').click(function () {
  location.href = "/product";
})


getType();


//获取商品类型
function getType() {
  $.ajax({
    type: 'get',
    url: 'http://127.0.0.1:7001/bGetType',
    data: {
      token: localStorage.getItem('token'),
      manage: 1
    },
    success: function (res) {

      console.log('获取商品类型 res ==> ', res);

      if (res.code == 700) {
        
        //如果未登录, 则跳转到登录页面
        location.href = '/';
      } else {
        
        //在这里处理结果
        res.result.forEach(function (item, index) {
          // console.log('item ==> ', item);

          var $tr = $(`<tr>
                  <td>${index + 1}</td>
                  <td>${item.typeId}</td>
                  <td>${item.type}</td>
                  <td>
                    <div class="td-box">
                      <div class="btn info">编辑</div>
                      <div class="btn danger">删除</div>
                    </div>
                    
                  </td>
                </tr>`);

          $('tbody').append($tr);
          
          
        })

      }

      
    },
    fail: function (err) {
      console.log('err ==> ', err);
      
    }
  })
}

//查询商家用户信息
function getUserInfo() {
  $.ajax({
    type: 'get',
    url: 'http://127.0.0.1:7001/bGetUserInfo',
    data: {
      token: localStorage.getItem('token'),
      manage: 1
    },
    success: function (res) {

      console.log('res ==> ', res);

      if (res.code == 700) {
        
        //如果未登录, 则跳转到登录页面
        location.href = '/';

      } else {
        
        //在这里处理结果
        //...
        $('#userimg').attr('src', res.result[0].userImg);
        $('#username').text(res.result[0].phone);

      }
      
    },
    fail: function (err) {
      console.log('err ==> ', err);
      
    }
  })
}

getUserInfo();

//退出登录
$('#logout').click(function () {
  $.ajax({
    type: 'post',
    url: 'http://127.0.0.1:7001/bLogout',
    data: {
      token: localStorage.getItem('token'),
      manage: 1,
    },
    success: function (res) {
      
      alert(res.msg);

      localStorage.removeItem('token');

      location.href = '/';
    },
    fail: function (err) {
      console.log('err ==> ', err);
      
    }
  })
})