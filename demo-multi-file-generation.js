/**
 * 演示多文件PPT生成功能
 * 这个脚本会生成多个HTML文件并保存到文件系统
 */

const fs = require('fs');
const path = require('path');

// 引入多文件PPT生成器
class MultiFilePPTGenerator {
    constructor() {
        this.chapters = [];
        this.pptTitle = '';
        this.pptSubtitle = '';
        this.currentTheme = 'technical';
        this.themes = {
            technical: {
                primary: 'from-blue-800 to-blue-900',
                secondary: 'from-orange-500 to-red-500',
                accent: 'from-blue-600 to-purple-600',
                text: 'text-white',
                cardBg: 'bg-blue-700/60'
            }
        };
    }

    generatePPTFiles(config) {
        const { title, subtitle, chapters, theme = 'technical' } = config;
        this.pptTitle = title;
        this.pptSubtitle = subtitle;
        this.chapters = chapters;
        this.currentTheme = theme;

        const files = {};
        
        // 生成主入口文件
        files['index.html'] = this.generateIndexFile();
        
        // 生成每个章节文件
        chapters.forEach((chapter, index) => {
            const filename = this.getChapterFilename(chapter, index);
            files[filename] = this.generateChapterFile(chapter, index);
        });

        return files;
    }

    getChapterFilename(chapter, index) {
        const paddedIndex = String(index).padStart(2, '0');
        const slug = chapter.slug || chapter.title.toLowerCase()
            .replace(/[^\u4e00-\u9fa5\w\s]/g, '')
            .replace(/\s+/g, '-');
        return `${paddedIndex}-${slug}.html`;
    }

    generateIndexFile() {
        const theme = this.themes[this.currentTheme];
        const chapterCards = this.chapters.map((chapter, index) => {
            const filename = this.getChapterFilename(chapter, index);
            return `
                <a href="${filename}" class="chapter-card bg-gradient-to-br ${theme.cardBg} backdrop-blur-sm rounded-xl p-6 border border-blue-600 hover:shadow-xl transition-all duration-300 transform hover:scale-105 block">
                    <div class="flex items-center mb-4">
                        <div class="bg-gradient-to-r ${theme.secondary} rounded-full p-3 mr-4">
                            <span class="text-white font-bold text-lg">${String(index + 1).padStart(2, '0')}</span>
                        </div>
                        <div>
                            <h3 class="text-xl font-bold ${theme.text} mb-1">${chapter.title}</h3>
                            <p class="text-blue-200 text-sm">${chapter.description || ''}</p>
                        </div>
                    </div>
                    <div class="text-blue-100 text-sm">
                        ${chapter.summary || '点击查看详细内容'}
                    </div>
                </a>`;
        }).join('');

        return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${this.pptTitle} - 目录</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        body {
            font-family: 'Microsoft YaHei', 'PingFang SC', 'Hiragino Sans GB', sans-serif;
        }
        .gradient-bg {
            background: linear-gradient(135deg, #1e3a8a 0%, #1e40af 50%, #2563eb 100%);
        }
    </style>
</head>
<body class="font-chinese">
    <div class="min-h-screen gradient-bg p-8">
        <div class="max-w-6xl mx-auto">
            <!-- 标题区域 -->
            <div class="text-center mb-16">
                <h1 class="text-6xl md:text-7xl font-bold ${theme.text} mb-6">
                    ${this.pptTitle}
                </h1>
                <p class="text-2xl md:text-3xl text-blue-200 mb-8">
                    ${this.pptSubtitle}
                </p>
                <div class="flex justify-center space-x-4">
                    <div class="w-16 h-1 bg-gradient-to-r ${theme.secondary} rounded-full"></div>
                    <div class="w-8 h-1 bg-gradient-to-r ${theme.accent} rounded-full"></div>
                    <div class="w-4 h-1 bg-blue-400 rounded-full"></div>
                </div>
            </div>

            <!-- 章节目录 -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                ${chapterCards}
            </div>

            <!-- 底部信息 -->
            <div class="text-center mt-16 text-blue-200">
                <p class="text-lg">共 ${this.chapters.length} 个章节</p>
                <p class="text-sm mt-2">点击任意章节开始浏览</p>
            </div>
        </div>
    </div>
</body>
</html>`;
    }

    generateChapterFile(chapter, index) {
        const theme = this.themes[this.currentTheme];
        const currentIndex = index + 1;
        const totalChapters = this.chapters.length;
        
        const prevChapter = index > 0 ? this.getChapterFilename(this.chapters[index - 1], index - 1) : null;
        const nextChapter = index < totalChapters - 1 ? this.getChapterFilename(this.chapters[index + 1], index + 1) : null;

        const content = this.generateChapterContent(chapter, theme);

        return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${chapter.title} - ${this.pptTitle}</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        body {
            font-family: 'Microsoft YaHei', 'PingFang SC', 'Hiragino Sans GB', sans-serif;
        }
        .gradient-bg {
            background: linear-gradient(135deg, #1e3a8a 0%, #1e40af 50%, #2563eb 100%);
        }
        .nav-btn {
            background: #2563eb;
            color: white;
            padding: 0.5rem 1rem;
            border-radius: 0.5rem;
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
            transition: all 0.3s;
            text-decoration: none;
            display: inline-block;
        }
        .nav-btn:hover {
            background: #1d4ed8;
        }
        .nav-btn:disabled {
            background: #6b7280;
            cursor: not-allowed;
            opacity: 0.5;
        }
    </style>
</head>
<body class="font-chinese">
    <!-- 章节内容 -->
    <div class="min-h-screen gradient-bg">
        ${content}
    </div>
    
    <!-- 导航栏 -->
    <nav style="position: fixed; bottom: 1.5rem; left: 50%; transform: translateX(-50%); background: rgba(0,0,0,0.5); border-radius: 0.5rem; padding: 1rem; display: flex; gap: 1rem; z-index: 50;">
        ${prevChapter ? 
            `<a href="${prevChapter}" class="nav-btn">← 上一章</a>` : 
            `<button disabled class="nav-btn">← 上一章</button>`
        }
        <a href="index.html" class="nav-btn">🏠 目录</a>
        ${nextChapter ? 
            `<a href="${nextChapter}" class="nav-btn">下一章 →</a>` : 
            `<button disabled class="nav-btn">下一章 →</button>`
        }
    </nav>
    
    <!-- 章节指示器 -->
    <div style="position: fixed; top: 1.5rem; right: 1.5rem; background: rgba(0,0,0,0.5); color: white; padding: 0.5rem 1rem; border-radius: 0.5rem; z-index: 50;">
        ${currentIndex} / ${totalChapters}
    </div>

    <!-- 章节标题指示器 -->
    <div style="position: fixed; top: 1.5rem; left: 1.5rem; background: rgba(0,0,0,0.5); color: white; padding: 0.5rem 1rem; border-radius: 0.5rem; z-index: 50;">
        ${chapter.title}
    </div>

    <script>
        // 键盘导航
        document.addEventListener('keydown', function(e) {
            if (e.key === 'ArrowRight' || e.key === ' ') {
                ${nextChapter ? `window.location.href = '${nextChapter}';` : ''}
            } else if (e.key === 'ArrowLeft') {
                ${prevChapter ? `window.location.href = '${prevChapter}';` : ''}
            } else if (e.key === 'Home') {
                window.location.href = 'index.html';
            } else if (e.key === 'Escape') {
                window.location.href = 'index.html';
            }
        });
    </script>
</body>
</html>`;
    }

    generateChapterContent(chapter, theme) {
        switch (chapter.type) {
            case 'cover':
                return this.generateCoverContent(chapter, theme);
            case 'introduction':
                return this.generateIntroductionContent(chapter, theme);
            case 'architecture':
                return this.generateArchitectureContent(chapter, theme);
            default:
                return this.generateDefaultContent(chapter, theme);
        }
    }

    generateCoverContent(chapter, theme) {
        return `
        <div class="w-full h-screen flex items-center justify-center p-8">
            <div class="text-center">
                <h1 class="text-6xl md:text-7xl font-bold ${theme.text} mb-8">
                    ${chapter.title}
                </h1>
                <p class="text-2xl md:text-3xl text-blue-200 mb-12">
                    ${chapter.subtitle || this.pptSubtitle}
                </p>
                ${chapter.description ? `
                <div class="max-w-4xl mx-auto mb-12">
                    <p class="text-xl text-blue-100 leading-relaxed">
                        ${chapter.description}
                    </p>
                </div>
                ` : ''}
                <div class="flex justify-center space-x-4">
                    <div class="w-16 h-1 bg-gradient-to-r ${theme.secondary} rounded-full"></div>
                    <div class="w-8 h-1 bg-gradient-to-r ${theme.accent} rounded-full"></div>
                    <div class="w-4 h-1 bg-blue-400 rounded-full"></div>
                </div>
            </div>
        </div>`;
    }

    generateIntroductionContent(chapter, theme) {
        return `
        <div class="w-full min-h-screen p-12">
            <div class="max-w-6xl mx-auto">
                <h1 class="text-5xl font-bold ${theme.text} mb-12 text-center">
                    ${chapter.title}
                </h1>
                
                ${chapter.content ? this.generateContentSections(chapter.content, theme) : ''}
            </div>
        </div>`;
    }

    generateArchitectureContent(chapter, theme) {
        const content = chapter.content;
        return `
        <div class="w-full min-h-screen p-12">
            <div class="max-w-6xl mx-auto">
                <h1 class="text-5xl font-bold ${theme.text} mb-12 text-center">
                    ${chapter.title}
                </h1>
                
                ${content.coreComponent ? `
                <div class="bg-gradient-to-r ${theme.accent} rounded-lg p-8 mb-6 text-center">
                    <h2 class="text-3xl font-bold ${theme.text} mb-4">
                        ${content.coreComponent.title}
                    </h2>
                    <p class="text-xl text-blue-100">
                        ${content.coreComponent.description}
                    </p>
                </div>
                ` : ''}

                ${content.components ? `
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    ${content.components.map(comp => `
                    <div class="${theme.cardBg} backdrop-blur-sm rounded-lg p-6 text-center border border-blue-600">
                        <h3 class="text-2xl font-bold ${theme.text} mb-2">
                            ${comp.icon || ''} ${comp.title}
                        </h3>
                        <p class="text-gray-200">${comp.description}</p>
                    </div>
                    `).join('')}
                </div>
                ` : ''}

                ${content.features ? `
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    ${content.features.map(feature => `
                    <div class="${theme.cardBg} backdrop-blur-sm rounded-lg p-6 border border-blue-600 text-center">
                        <h4 class="text-xl font-bold ${theme.text} mb-3">
                            ${feature.icon || ''} ${feature.title}
                        </h4>
                        <p class="text-blue-100">${feature.description}</p>
                    </div>
                    `).join('')}
                </div>
                ` : ''}
            </div>
        </div>`;
    }

    generateDefaultContent(chapter, theme) {
        return `
        <div class="w-full min-h-screen p-12">
            <div class="max-w-6xl mx-auto">
                <h1 class="text-5xl font-bold ${theme.text} mb-12 text-center">
                    ${chapter.title}
                </h1>
                
                ${chapter.content ? this.generateContentSections(chapter.content, theme) : ''}
            </div>
        </div>`;
    }

    generateContentSections(content, theme) {
        if (typeof content === 'string') {
            return `<div class="text-xl text-blue-100 leading-relaxed">${content}</div>`;
        }
        return this.generateSection(content, theme);
    }

    generateSection(section, theme) {
        return `
        <div class="mb-8">
            ${section.title ? `
            <h2 class="text-3xl font-bold ${theme.text} mb-6">
                ${section.title}
            </h2>
            ` : ''}
            ${section.items ? `
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                ${section.items.map(item => `
                <div class="${theme.cardBg} backdrop-blur-sm rounded-lg p-6 border border-blue-600 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                    <h3 class="text-xl font-bold ${theme.text} mb-3">
                        ${item.icon || ''} ${item.title}
                    </h3>
                    <p class="text-blue-100">
                        ${item.description}
                    </p>
                </div>
                `).join('')}
            </div>
            ` : ''}
            ${section.description ? `
            <p class="text-xl text-blue-100 leading-relaxed">
                ${section.description}
            </p>
            ` : ''}
        </div>`;
    }
}

// 演示配置
const demoConfig = {
    title: "RADOS: 可靠的分布式对象存储",
    subtitle: "Reliable Autonomic Distributed Object Store",
    theme: "technical",
    chapters: [
        {
            type: "cover",
            title: "RADOS",
            subtitle: "可靠的分布式对象存储",
            description: "现代化的分布式存储解决方案，为云计算和大数据提供可靠的基础设施支撑。",
            slug: "cover"
        },
        {
            type: "introduction",
            title: "系统介绍",
            description: "RADOS系统概述与核心概念",
            content: {
                title: "什么是RADOS",
                description: "RADOS (Reliable Autonomic Distributed Object Store) 是Ceph存储集群的基础，它是一个可靠的、自动化的、分布式的对象存储系统。",
                items: [
                    {
                        icon: "🏗️",
                        title: "分布式架构",
                        description: "采用分布式设计，支持水平扩展，可处理PB级数据存储"
                    },
                    {
                        icon: "🔄",
                        title: "自动化管理",
                        description: "自动处理故障检测和数据恢复，减少人工干预"
                    },
                    {
                        icon: "📦",
                        title: "对象存储",
                        description: "以对象形式存储数据，提供高度的灵活性和可扩展性"
                    }
                ]
            },
            slug: "introduction"
        },
        {
            type: "architecture",
            title: "系统架构",
            description: "RADOS分布式架构设计详解",
            content: {
                coreComponent: {
                    title: "🛡️ RADOS 核心层",
                    description: "Reliable Autonomic Distributed Object Store - 可靠的自主分布式对象存储"
                },
                components: [
                    {
                        icon: "📊",
                        title: "OSD集群",
                        description: "物理存储设备管理，负责实际数据存储和检索"
                    },
                    {
                        icon: "🖥️",
                        title: "Monitor集群",
                        description: "集群状态监控管理，维护集群健康状态"
                    }
                ],
                features: [
                    {
                        icon: "🔄",
                        title: "数据复制",
                        description: "自动数据复制确保高可用性和数据安全"
                    },
                    {
                        icon: "⚡",
                        title: "CRUSH算法",
                        description: "智能数据分布和定位，无需中心化元数据"
                    },
                    {
                        icon: "🛠️",
                        title: "自我修复",
                        description: "自动故障检测和恢复，保证系统稳定性"
                    }
                ]
            },
            slug: "architecture"
        },
        {
            type: "features",
            title: "核心特性",
            description: "RADOS的关键功能特性介绍",
            content: "RADOS提供了企业级的分布式存储功能，包括数据一致性保证、故障自动恢复、水平扩展能力等核心特性。",
            slug: "features"
        },
        {
            type: "summary",
            title: "总结",
            description: "RADOS技术要点回顾",
            content: "RADOS作为Ceph的核心组件，为现代化存储需求提供了完整的解决方案。其分布式架构、自动化管理和高可靠性特性，使其成为云计算和大数据场景下的理想选择。",
            slug: "summary"
        }
    ]
};

// 生成并保存文件
function generateAndSaveFiles() {
    const generator = new MultiFilePPTGenerator();
    const files = generator.generatePPTFiles(demoConfig);

    // 创建输出目录
    const outputDir = './generated-ppt';
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir);
    }

    // 保存文件
    Object.entries(files).forEach(([filename, content]) => {
        const filePath = path.join(outputDir, filename);
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`✅ 生成文件: ${filename}`);
    });

    console.log(`\n🎉 PPT生成完成！生成了 ${Object.keys(files).length} 个文件`);
    console.log(`📁 文件保存在: ${outputDir} 目录下`);
    console.log('\n📋 文件列表:');
    Object.keys(files).forEach(filename => {
        console.log(`   - ${filename}`);
    });
    
    console.log('\n🚀 使用方法:');
    console.log(`   1. 用浏览器打开 ${outputDir}/index.html 查看PPT目录`);
    console.log('   2. 点击任意章节开始浏览');
    console.log('   3. 使用键盘方向键或鼠标进行导航');
}

// 如果直接运行此脚本
if (require.main === module) {
    generateAndSaveFiles();
}

module.exports = { MultiFilePPTGenerator, generateAndSaveFiles };