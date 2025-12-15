<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <link rel="stylesheet" href="../public/css/style.css">
    <style>
        .thumb-img { width: 60px; height: 60px; object-fit: cover; border-radius: 6px; border: 1px solid #ddd; }
    </style>
</head>
<body>

<div class="card shadow-sm">
    <div class="card-header bg-white py-3 d-flex justify-content-between align-items-center">
        <h5 class="m-0 fw-bold text-success"><i class="fas fa-box"></i> 商品列表</h5>
        <button class="btn btn-success" onclick="openAddModal()"><i class="fas fa-plus"></i> 发布商品</button>
    </div>
    <div class="card-body">
        <table class="table align-middle">
            <thead class="table-light">
                <tr>
                    <th>图片</th>
                    <th>商品名称</th>
                    <th>价格</th>
                    <th>库存</th>
                    <th>分类</th>
                    <th>操作</th>
                </tr>
            </thead>
            <tbody id="pBody"></tbody>
        </table>
    </div>
</div>

<div class="modal fade" id="productModal" tabindex="-1">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="pModalTitle">商品信息</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body">
                <form id="pForm">
                    <input type="hidden" id="pId">
                    <div class="row">
                        <div class="col-md-6 mb-3">
                            <label>商品名称</label>
                            <input type="text" class="form-control" id="pName">
                        </div>
                        <div class="col-md-6 mb-3">
                            <label>分类</label>
                            <select class="form-select" id="pType">
                                <option value="">加载中...</option>
                            </select>
                        </div>
                        <div class="col-md-6 mb-3">
                            <label>价格</label>
                            <div class="input-group">
                                <span class="input-group-text">￥</span>
                                <input type="number" class="form-control" id="pPrice">
                            </div>
                        </div>
                        <div class="col-md-6 mb-3">
                            <label>库存</label>
                            <input type="number" class="form-control" id="pStock">
                        </div>
                        <div class="col-12 mb-3">
                            <label>描述</label>
                            <textarea class="form-control" id="pMsg" rows="2"></textarea>
                        </div>
                        <div class="col-12 mb-3">
                            <label>上传图片</label>
                            <input type="file" class="form-control" id="pFile">
                            <div class="mt-2" id="previewArea"></div>
                        </div>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">关闭</button>
                <button type="button" class="btn btn-success" onclick="saveProduct()">保存商品</button>
            </div>
        </div>
    </div>
</div>

<script src="../public/js/jquery-3.7.1.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
<script src="../public/js/config.js"></script>

<script>
    let pModal;
    let typeMap = {}; // 缓存分类ID到名称的映射

    $(function() {
        pModal = new bootstrap.Modal(document.getElementById('productModal'));
        initData();
    });

    // 初始化：先加载分类，再加载商品
    function initData() {
        $.get(API_BASE_URL + "/find_type", function(res) {
            if(res.code === 200) {
                let opts = '<option value="">请选择分类</option>';
                res.data.forEach(t => {
                    typeMap[t.id] = t.name;
                    opts += `<option value="${t.id}">${t.name}</option>`;
                });
                $('#pType').html(opts);
                loadProducts(); // 分类加载完才加载商品
            }
        });
    }

    function loadProducts() {
        $.get(API_BASE_URL + "/find_product", function(res) {
            let html = '';
            if(res.code === 200) {
                res.data.forEach(p => {
                    // 处理图片URL，如果是相对路径则拼接
                    let imgUrl = p.img ? (p.img.startsWith('http') ? p.img : API_BASE_URL + '/' + p.img) : '../public/images/default.png';
                    
                    html += `
                        <tr>
                            <td><img src="${imgUrl}" class="thumb-img" onerror="this.src='https://via.placeholder.com/60'"></td>
                            <td class="fw-bold">${p.name}</td>
                            <td class="text-danger">¥${p.price}</td>
                            <td><span class="badge bg-secondary">${p.stock}</span></td>
                            <td><span class="badge bg-info text-dark">${typeMap[p.typeid] || '未知'}</span></td>
                            <td>
                                <button class="btn btn-sm btn-light border" onclick='editP(${JSON.stringify(p)})'>修改</button>
                                <button class="btn btn-sm btn-danger" onclick="delP(${p.id})">下架</button>
                            </td>
                        </tr>
                    `;
                });
                $('#pBody').html(html);
            }
        });
    }

    function openAddModal() {
        $('#pForm')[0].reset();
        $('#pId').val('');
        $('#pModalTitle').text('发布新商品');
        $('#previewArea').html('');
        pModal.show();
    }

    window.editP = function(item) {
        $('#pId').val(item.id);
        $('#pName').val(item.name);
        $('#pPrice').val(item.price);
        $('#pStock').val(item.stock);
        $('#pType').val(item.typeid);
        $('#pMsg').val(item.msg);
        $('#pModalTitle').text('编辑商品');
        pModal.show();
    }

    window.saveProduct = function() {
        const formData = new FormData();
        const id = $('#pId').val();
        
        formData.append('name', $('#pName').val());
        formData.append('price', $('#pPrice').val());
        formData.append('stock', $('#pStock').val());
        formData.append('typeid', $('#pType').val());
        formData.append('msg', $('#pMsg').val());
        
        const file = $('#pFile')[0].files[0];
        if(file) {
            formData.append('file', file);
        }

        if(id) formData.append('id', id);

        const url = id ? "/update_product" : "/create_product";

        $.ajax({
            url: API_BASE_URL + url,
            type: 'POST',
            data: formData,
            processData: false, // 必须
            contentType: false, // 必须
            success: function(res) {
                if(res.code === 200) {
                    pModal.hide();
                    Swal.fire('好耶', '商品保存成功', 'success');
                    loadProducts();
                } else {
                    Swal.fire('错误', res.msg, 'error');
                }
            }
        });
    }

    window.delP = function(id) {
        Swal.fire({
            title: '确定下架?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
        }).then((result) => {
            if (result.isConfirmed) {
                $.post(API_BASE_URL + "/remove_product", { id }, function(res) {
                    if(res.code === 200) loadProducts();
                    else Swal.fire('失败', res.msg, 'error');
                });
            }
        })
    }
</script>
</body>
</html>