// var that;
class Tab {
    constructor(id) {
        that = this;
        //获取大的容器
        this.main = document.querySelector(id);

        //获取添加按钮
        this.add = this.main.querySelector('.tabadd');
        this.ul = this.main.querySelector('.fisrstnav ul');
        this.fsection = this.main.querySelector('.tabscon');

        this.init();
    }

    //获取标题和内容节点（由于更新dom需要重新获取，所以要单独定义个方法）
    updateNode() {
        this.lis = this.main.querySelectorAll('li');
        this.sections = this.main.querySelectorAll('section');

        //获取删除按钮
        this.remove = this.main.querySelectorAll('.iconfont');

        //获取修改元素
        this.spans = this.main.querySelectorAll('.fisrstnav li span:first-child');
    }

    //0.初始化操作，让相关的元素绑定事件
    init() {
        this.updateNode(); //重新获取更新后的节点
        //0.1切换绑定事件
        for (let i = 0; i < this.lis.length; i++) {
            this.lis[i].index = i;  //给每个li添加index属性保存索引值
            this.lis[i].onclick = this.toggleTab.bind(this.lis[i],this);
            this.remove[i].onclick = this.removeTab.bind(this.remove[i],this); /* 删除绑定事件 */
            this.spans[i].ondblclick = this.editTab; //编辑功能
            this.sections[i].ondblclick = this.editTab; //编辑功能
        }
        //0.2添加绑定事件
        this.add.onclick = this.addTab.bind(this.add, this);
    }

    //1.切换
    toggleTab(that) {
        //排他思想
        that.clearClass();
        this.className = 'liactive';
        that.sections[this.index].className = 'conactive';
    }

    clearClass() {
        for (let i = 0; i < this.lis.length; i++) {
            this.lis[i].className = '';
            this.sections[i].className = '';
        }
    }

    //2.添加
    addTab(that) {
        that.clearClass();
        let random = Math.random();
        //2.1创建元素
        let li = `<li class="liactive"><span>测试${random}</span><span class="iconfont icon-guanbi"></span></li>`
        let section = `<section class="conactive">测试${random}</section>`
        //2.2追加到父元素中
        that.ul.insertAdjacentHTML('beforeend', li);
        that.fsection.insertAdjacentHTML('beforeend', section);
        //2.3重新初始化，获取节点并绑定事件（不重新初始化，获取的还是旧DOM）
        that.init();
    }

    //3.删除
    removeTab(that,e) {
        e.stopPropagation();  //阻止事件冒泡到li的切换，只删除就行
        let index = this.parentNode.index;
        that.lis[index].remove();
        that.sections[index].remove();
        that.init(); //重新获取更新后的DOM，避免出现不必要的问题

        //删除之后让它前边那个卡高亮
        if(document.querySelector('.liactive')) return;
        index--;
        that.lis[index] && that.lis[index].click(); //逻辑短路，如果index=-1就不点击
    }

    //4.修改
    editTab() {
        let value = this.innerHTML;
        // 双击禁止选定文字
        window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
        //双击生成文本框
        this.innerHTML = `<input type="text" value=${value} >`;
        let input = this.children[0];
        input.select();
        //离开文本框时把文本框的值给span
        input.onblur = function() {
            this.parentNode.innerHTML = this.value; 
        }
        input.onkeyup = function(e) {
            if(e.key === 'Enter') {
                this.blur();
            }
        }
    }
}

new Tab('#tab');