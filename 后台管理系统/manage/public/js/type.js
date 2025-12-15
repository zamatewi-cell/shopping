// 定义接口基础地址 (根据你的后端配置)
const BASE_URL = "http://127.0.0.1:1024"; 
let typeModal; // Bootstrap Modal 实例

$(document).ready(function() {
    typeModal = new bootstrap.Modal(document.getElementById('typeModal'));
    getTypeList();
});

// 获取列表
function getTypeList() {
    $.get(BASE_URL + "/find_type", function(res) {
        if (res.code === 200) {
            renderTable(res.data);
        } else {
            alert("加载失败: " + res.msg);
        }
    });
}

// 渲染表格
function renderTable(data) {
    let html = "";
    data.forEach(item => {
        html += `
            <tr>
                <td>${item.id}</td>
                <td><span class="badge bg-info text-dark">${item.name}</span></td>
                <td>
                    <button class="btn btn-sm btn-outline-primary me-2" onclick="editType(${item.id}, '${item.name}')">
                        <i class="fas fa-edit"></i> 编辑
                    </button>
                    <button class="btn btn-sm btn-outline-danger" onclick="deleteType(${item.id})">
                        <i class="fas fa-trash"></i> 删除
                    </button>
                </td>
            </tr>
        `;
    });
    $("#type_body").html(html);
}

// 打开模态框 (新增模式)
function openModal() {
    $("#modalTitle").text("新增类型");
    $("#typeId").val("");
    $("#typeName").val("");
    typeModal.show();
}

// 打开模态框 (编辑模式)
function editType(id, name) {
    $("#modalTitle").text("编辑类型");
    $("#typeId").val(id);
    $("#typeName").val(name);
    typeModal.show();
}

// 保存 (新增或修改)
function saveType() {
    const id = $("#typeId").val();
    const name = $("#typeName").val();

    if (!name) return alert("请输入类型名称");

    const url = id ? "/update_type" : "/create_type";
    const data = id ? { id, name } : { name };

    $.post(BASE_URL + url, data, function(res) {
        if (res.code === 200) {
            typeModal.hide();
            getTypeList(); // 刷新列表
        } else {
            alert(res.msg);
        }
    });
}

// 删除
function deleteType(id) {
    if (confirm("确定要删除这个类型吗？")) {
        $.post(BASE_URL + "/remove_type", { id: id }, function(res) {
            if (res.code === 200) {
                getTypeList();
            } else {
                alert("删除失败: " + res.msg);
            }
        });
    }
}

// 简单的前端搜索 (升华)
function searchType() {
    const val = $("#searchInput").val().toLowerCase();
    $("#type_body tr").filter(function() {
        $(this).toggle($(this).text().toLowerCase().indexOf(val) > -1)
    });
}