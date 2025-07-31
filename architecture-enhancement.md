# 增强版系统提示词 - 包含架构图要求

基于原有的 agent-system-prompt.md，添加以下重要补充：

## ⭐ 架构图生成要求（重要补充）⭐

**针对架构页 (`02-architecture.html`) 的特殊要求：**

### 必须包含的架构图元素
1. **分层架构可视化**: 应用层→核心层→存储层的三层结构
2. **组件关系图**: 各组件间的连接线和数据流向  
3. **交互式卡片**: 每个层级和组件都用卡片形式展示
4. **连接动画**: 箭头或连接线表示数据流向

### 架构图HTML模板示例
```html
<div class="architecture-container">
    <div class="architecture-layer">
        <div class="layer-title">应用层</div>
        <div class="components-row">
            <div class="component">📊 RBD</div>
            <div class="component">🌐 RGW</div>
            <div class="component">📁 CephFS</div>
        </div>
    </div>
    
    <div class="connection-lines">
        <div class="arrow-down"></div>
    </div>
    
    <div class="architecture-layer">
        <div class="layer-title">🛡️ RADOS 核心层</div>
        <div class="core-description">数据存储</div>
    </div>
    
    <div class="connection-lines">
        <div class="arrow-down"></div>
    </div>
    
    <div class="architecture-layer">
        <div class="layer-title">OSD存储集群</div>
        <div class="storage-nodes">
            <div class="storage-node">OSD 1</div>
            <div class="storage-node">OSD 2</div>
            <div class="storage-node">OSD 3</div>
            <div class="storage-node">OSD 4</div>
        </div>
    </div>
</div>
```

### 必需的CSS样式
```css
.architecture-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3rem;
    padding: 2rem;
}

.architecture-layer {
    background: linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(37, 99, 235, 0.2));
    border: 2px solid rgba(59, 130, 246, 0.3);
    border-radius: 1.5rem;
    padding: 2rem;
    width: 100%;
    text-align: center;
}

.components-row {
    display: flex;
    justify-content: center;
    gap: 1.5rem;
    flex-wrap: wrap;
}

.component {
    background: linear-gradient(135deg, #f97316, #ea580c);
    color: white;
    padding: 1rem 2rem;
    border-radius: 0.75rem;
    font-weight: 600;
}

.storage-nodes {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1rem;
}

.connection-lines {
    height: 3rem;
    display: flex;
    align-items: center;
    justify-content: center;
}

.arrow-down {
    width: 0;
    height: 0;
    border-left: 15px solid transparent;
    border-right: 15px solid transparent;
    border-top: 20px solid rgba(59, 130, 246, 0.6);
}
```

**关键要求：架构页不能只有文字描述，必须包含上述HTML+CSS的可视化架构图结构！**

## 架构图要求总结

### ✅ 必须包含：
1. 完整的分层架构图HTML结构
2. 专业的CSS样式和动画效果
3. 清晰的组件关系和连接线
4. 三层架构：应用层→核心层→存储层

### ❌ 不能出现：
1. 只有文字描述或简单列表
2. 缺少视觉化的架构结构
3. 没有组件间的连接关系

使用时请将此要求与原有的 agent-system-prompt.md 结合使用。
