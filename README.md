# PPT Generator with Tailwind CSS

一个基于Tailwind CSS的专业PPT生成系统，支持AI驱动的技术演示文稿创建。

## 🚀 功能特性

### 核心功能
- **AI驱动内容生成**: 专门的Agent System Prompt用于生成专业PPT内容
- **现代化设计**: 基于Tailwind CSS的美观界面设计
- **响应式布局**: 适配不同屏幕尺寸的演示需求
- **中文字体优化**: 完美支持中文内容展示
- **交互式导航**: 键盘和鼠标多种控制方式

### 设计特色
- **渐变背景**: 专业的蓝色系渐变背景
- **卡片式布局**: 清晰的信息层次结构
- **图标系统**: 语义化SVG图标增强视觉表达
- **动画效果**: 平滑的页面切换和内容展示动画
- **主题系统**: 支持技术、商务、医疗等多种主题

## 📁 项目结构

```
.
├── package.json              # 项目配置和依赖
├── tailwind.config.js        # Tailwind CSS 配置
├── src/
│   └── input.css             # Tailwind CSS 输入文件
├── index.html                # 主要的PPT演示文件
├── ppt-generator.js          # PPT生成器JavaScript模块
├── agent-system-prompt.md    # Agent系统提示词文档
└── README.md                 # 项目说明文档
```

## 🛠️ 快速开始

### 1. 安装依赖
```bash
npm install
```

### 2. 启动开发服务器
```bash
npm run dev
```

### 3. 构建CSS（可选）
```bash
npm run build
```

### 4. 访问PPT
打开浏览器访问 `http://localhost:3000` 查看PPT演示

## 🎨 主题系统

系统支持多种预设主题：

### Technical（技术主题）
- 主色调: 蓝色系列
- 辅助色: 橙色渐变
- 适用于: 技术演示、架构介绍

### Business（商务主题）
- 主色调: 灰色系列
- 辅助色: 绿色渐变
- 适用于: 商业报告、产品介绍

### Medical（医疗主题）
- 主色调: 青色系列
- 辅助色: 红粉渐变
- 适用于: 医疗健康、科研展示

## 🤖 Agent System Prompt

为了生成高质量的PPT内容，我们提供了专门的Agent System Prompt：

### 核心能力
- **技术专长**: 精通前端技术和现代设计理念
- **内容生成**: 准确、逻辑清晰的技术内容创建
- **样式规范**: 统一的颜色系统和组件样式
- **交互设计**: 完整的导航和控制功能

### 使用方法
参考 `agent-system-prompt.md` 文件中的详细说明，可以直接使用该提示词来指导AI生成PPT内容。

## 📝 PPT生成器使用示例

```javascript
// 引入PPT生成器
const PPTGenerator = require('./ppt-generator.js');

// 创建生成器实例
const generator = new PPTGenerator();

// 配置PPT内容
const config = {
    title: "RADOS: 可靠的分布式对象存储",
    subtitle: "Reliable Autonomic Distributed Object Store",
    theme: "technical",
    slides: [
        {
            type: "architecture",
            title: "系统架构",
            content: {
                coreComponent: {
                    title: "核心组件",
                    description: "系统核心架构说明"
                },
                components: [
                    {
                        icon: "📊",
                        title: "数据层",
                        description: "数据存储和管理"
                    }
                ],
                features: [
                    {
                        icon: "🔄",
                        title: "高可用",
                        description: "99.9%可用性保证"
                    }
                ]
            }
        }
    ]
};

// 生成PPT HTML
const pptHtml = generator.generatePPT(config);
```

## 🎮 交互控制

### 键盘快捷键
- `→` 或 `Space`: 下一页
- `←`: 上一页
- `Home`: 第一页
- `End`: 最后一页

### 鼠标控制
- 点击底部导航按钮进行页面切换
- 悬停效果展示交互反馈

## 🎯 页面类型

系统支持多种页面类型：

### 1. 标题页 (Title Slide)
- 大标题显示
- 副标题说明
- 装饰性渐变线条

### 2. 架构页 (Architecture Slide)
- 核心组件展示
- 系统架构图
- 组件关系说明

### 3. 功能页 (Features Slide)
- 左右分栏布局
- 功能特性列表
- 详细说明区域

### 4. 内容页 (Content Slide)
- 网格布局
- 卡片式内容展示
- 支持图标和描述

## 🌟 最佳实践

### 内容组织
1. **结构清晰**: 遵循封面→架构→功能→优势→总结的逻辑
2. **信息层次**: 使用标题、副标题、正文的层次结构
3. **视觉平衡**: 合理分配文字和图标的比例

### 设计原则
1. **一致性**: 保持统一的颜色和字体风格
2. **简洁性**: 避免信息过载，突出重点内容
3. **可读性**: 确保文字对比度和字体大小适宜

### 技术建议
1. **响应式**: 确保在不同设备上的显示效果
2. **性能**: 优化图片和动画，保证流畅体验
3. **兼容性**: 测试主流浏览器的兼容性

## 📊 示例内容：RADOS存储系统

项目包含完整的RADOS分布式对象存储系统PPT示例，展示了：

- **系统架构**: 核心组件和服务层次
- **技术特性**: 对象存储、数据分布、自我修复等
- **工作原理**: CRUSH算法、数据复制、故障恢复
- **应用场景**: 支撑上层应用如RBD、CephFS、RGW

## 🔧 自定义开发

### 添加新主题
在 `ppt-generator.js` 的 `themes` 对象中添加新主题配置：

```javascript
newTheme: {
    primary: 'from-color-800 to-color-900',
    secondary: 'from-accent-500 to-accent-600',
    accent: 'from-highlight-600 to-highlight-700',
    text: 'text-white',
    cardBg: 'bg-color-700/60'
}
```

### 创建新页面类型
在 `generateSlide` 方法中添加新的页面类型处理逻辑：

```javascript
case 'newType':
    return this.generateNewTypeSlide(title, content, index);
```

### 扩展动画效果
在Tailwind配置中添加新的动画关键帧：

```javascript
keyframes: {
    newAnimation: {
        '0%': { /* 初始状态 */ },
        '100%': { /* 结束状态 */ },
    }
}
```

## 📄 License

MIT License - 详见 LICENSE 文件

## 🤝 贡献

欢迎提交 Issue 和 Pull Request 来改进这个项目！

---

> 这个PPT生成系统特别适合技术团队制作高质量的演示文稿，结合AI Agent可以快速生成专业的技术内容。
