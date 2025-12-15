$('.add-btn').click(function () {

  console.log('添加商品类型');
  
  $('.add-type-box').slideDown(350);

})

$('.cancel').click(function () {
  $('.add-type-box').slideUp(350);
})

var data = {
  token: localStorage.getItem('token'),
  manage: 1
};

$('.commit').click(function () {

  $('.a').each(function () {

    var id = $(this).attr('id');
    var val = $(this).val();

    data[id] = val;

  })

  console.log('data ==> ', data);

  $.ajax({
    type: 'post',
    url: 'http://127.0.0.1:7001/bAddProduct',
    data,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    success: function (res) {
      // console.log('添加商品 res ==> ', res);
      alert(res.msg);

      location.reload();
    },
    fail: function (err) {
      console.log('err ==> ', err);
      
    }
  })

})


$('#img').change(function () {

  // console.log('this.files ==> ', this.files);

  var imgType = this.files[0].type.split('/')[1];
  // console.log('imgType ==> ', imgType);

  var imgName = this.files[0].name.split('.')[0];
  // console.log('imgName ==> ', imgName);
  
  var fileReader = new FileReader();

  fileReader.onload = function () {
    // console.log('this.result ==> ', this.result);

    var base64 = this.result.replace(/data:image\/[A-Za-z]+;base64,/, '');

    // console.log('base64 ==> ', base64);

    data.imgBase64 = base64;

    data.imgType = imgType;

    data.imgName = imgName;

  }

  fileReader.readAsDataURL(this.files[0]);


})


$('#largeImg').change(function () {

  var largeImgType = this.files[0].type.split('/')[1];
  // console.log('largeImgType ==> ', largeImgType);

  var largeImgName = this.files[0].name.split('.')[0];
  // console.log('largeImgName ==> ', largeImgName);
  
  var fileReader = new FileReader();

  fileReader.onload = function () {
    // console.log('this.result ==> ', this.result);

    var base64 = this.result.replace(/data:image\/[A-Za-z]+;base64,/, '');

    // console.log('base64 ==> ', base64);

    data.largeImgBase64 = base64;

    data.largeImgType = largeImgType;

    data.largeImgName = largeImgName;

  }

  fileReader.readAsDataURL(this.files[0]);

})



$('#prot').click(function () {
  location.href = "/type";
})


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

      console.log('res ==> ', res);

      if (res.status == -1) {
        
        //如果未登录, 则跳转到登录页面
        location.href = '/';

      } else {
        
        //在这里处理结果
        //...
        res.result.forEach(function (item) {
          // console.log('item ==> ', item);
          
          var $option = $(`<option value="${item.typeId}">${item.type}</option>`);

          $('.typelist').append($option);
          
        })

      }
      
    },
    fail: function (err) {
      console.log('err ==> ', err);
      
    }
  })
}


getType();

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

//获取商品
function getProduct() {
  $.ajax({
    type: 'get',
    url: 'http://127.0.0.1:7001/bGetProduct',
    data: {
      token: localStorage.getItem('token'),
      manage: 1
    },
    success: function (res) {

      console.log('获取商品 res ==> ', res);

      if (res.code == 700) {
        
        //如果未登录, 则跳转到登录页面
        location.href = '/';
      } else {
        
        //在这里处理结果
        res.result.forEach(function (item, index) {
          // console.log('item ==> ', item);

          var $tr = $(`<tr>
                  <td>${index + 1}</td>
                  <td>${item.pid}</td>
                  <td><img class="im" src="${item.small_img}"></td>
                  <td>${item.name}</td>
                  <td>${item.enname}</td>
                  <td>${item.type}</td>
                  <td>${item.price}</td>
                  <td>${item.flag}</td>
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

getProduct();