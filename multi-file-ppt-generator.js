/**
 * Multi-File PPT Generator with Tailwind CSS
 * 支持为每个章节生成独立HTML文件的PPT生成工具
 */

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
            },
            business: {
                primary: 'from-gray-800 to-gray-900',
                secondary: 'from-green-500 to-emerald-500',
                accent: 'from-indigo-600 to-purple-600',
                text: 'text-white',
                cardBg: 'bg-gray-700/60'
            },
            medical: {
                primary: 'from-teal-800 to-teal-900',
                secondary: 'from-red-500 to-pink-500',
                accent: 'from-teal-600 to-cyan-600',
                text: 'text-white',
                cardBg: 'bg-teal-700/60'
            }
        };
    }

    /**
     * 生成完整的PPT文件集合
     * @param {Object} config - PPT配置信息
     * @param {string} config.title - PPT标题
     * @param {string} config.subtitle - PPT副标题
     * @param {Array} config.chapters - 章节内容数组
     * @param {string} config.theme - 主题名称
     */
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

    /**
     * 生成章节文件名
     */
    getChapterFilename(chapter, index) {
        const paddedIndex = String(index).padStart(2, '0');
        const slug = chapter.slug || chapter.title.toLowerCase()
            .replace(/[^\u4e00-\u9fa5\w\s]/g, '')
            .replace(/\s+/g, '-');
        return `${paddedIndex}-${slug}.html`;
    }

    /**
     * 生成主入口文件 (index.html)
     */
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
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    fontFamily: {
                        'chinese': ['"Microsoft YaHei"', '"PingFang SC"', '"Hiragino Sans GB"', 'sans-serif'],
                    },
                    animation: {
                        'fade-in': 'fadeIn 0.5s ease-in-out',
                        'slide-up': 'slideUp 0.6s ease-out',
                        'scale-in': 'scaleIn 0.4s ease-out',
                    },
                    keyframes: {
                        fadeIn: {
                            '0%': { opacity: '0' },
                            '100%': { opacity: '1' },
                        },
                        slideUp: {
                            '0%': { transform: 'translateY(20px)', opacity: '0' },
                            '100%': { transform: 'translateY(0)', opacity: '1' },
                        },
                        scaleIn: {
                            '0%': { transform: 'scale(0.95)', opacity: '0' },
                            '100%': { transform: 'scale(1)', opacity: '1' },
                        }
                    }
                }
            }
        }
    </script>
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
            <div class="text-center mb-16 animate-fade-in">
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
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-slide-up">
                ${chapterCards}
            </div>

            <!-- 底部信息 -->
            <div class="text-center mt-16 text-blue-200">
                <p class="text-lg">共 ${this.chapters.length} 个章节</p>
                <p class="text-sm mt-2">点击任意章节开始浏览</p>
            </div>
        </div>
    </div>

    <script>
        // 键盘导航支持
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                // 进入第一个章节
                const firstChapter = document.querySelector('.chapter-card');
                if (firstChapter) {
                    window.location.href = firstChapter.href;
                }
            }
        });
    </script>
</body>
</html>`;
    }

    /**
     * 生成章节文件
     */
    generateChapterFile(chapter, index) {
        const theme = this.themes[this.currentTheme];
        const currentIndex = index + 1;
        const totalChapters = this.chapters.length;
        
        // 导航链接
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
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    fontFamily: {
                        'chinese': ['"Microsoft YaHei"', '"PingFang SC"', '"Hiragino Sans GB"', 'sans-serif'],
                    },
                    animation: {
                        'fade-in': 'fadeIn 0.5s ease-in-out',
                        'slide-up': 'slideUp 0.6s ease-out',
                        'scale-in': 'scaleIn 0.4s ease-out',
                    },
                    keyframes: {
                        fadeIn: {
                            '0%': { opacity: '0' },
                            '100%': { opacity: '1' },
                        },
                        slideUp: {
                            '0%': { transform: 'translateY(20px)', opacity: '0' },
                            '100%': { transform: 'translateY(0)', opacity: '1' },
                        },
                        scaleIn: {
                            '0%': { transform: 'scale(0.95)', opacity: '0' },
                            '100%': { transform: 'scale(1)', opacity: '1' },
                        }
                    }
                }
            }
        }
    </script>
    <style>
        body {
            font-family: 'Microsoft YaHei', 'PingFang SC', 'Hiragino Sans GB', sans-serif;
        }
        .gradient-bg {
            background: linear-gradient(135deg, #1e3a8a 0%, #1e40af 50%, #2563eb 100%);
        }
        .nav-btn {
            @apply bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-lg transition-all duration-300;
        }
        .nav-btn:disabled {
            @apply bg-gray-600 cursor-not-allowed opacity-50;
        }
    </style>
</head>
<body class="font-chinese">
    <!-- 章节内容 -->
    <div class="min-h-screen gradient-bg">
        ${content}
    </div>
    
    <!-- 导航栏 -->
    <nav class="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-black/50 rounded-lg p-4 flex space-x-4 z-50">
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
    <div class="fixed top-6 right-6 bg-black/50 text-white px-4 py-2 rounded-lg z-50">
        ${currentIndex} / ${totalChapters}
    </div>

    <!-- 章节标题指示器 -->
    <div class="fixed top-6 left-6 bg-black/50 text-white px-4 py-2 rounded-lg z-50">
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

        // 添加加载动画
        document.addEventListener('DOMContentLoaded', function() {
            document.body.classList.add('animate-fade-in');
        });
    </script>
</body>
</html>`;
    }

    /**
     * 根据章节类型生成对应的内容
     */
    generateChapterContent(chapter, theme) {
        switch (chapter.type) {
            case 'cover':
                return this.generateCoverContent(chapter, theme);
            case 'introduction':
                return this.generateIntroductionContent(chapter, theme);
            case 'architecture':
                return this.generateArchitectureContent(chapter, theme);
            case 'features':
                return this.generateFeaturesContent(chapter, theme);
            case 'advantages':
                return this.generateAdvantagesContent(chapter, theme);
            case 'summary':
                return this.generateSummaryContent(chapter, theme);
            default:
                return this.generateDefaultContent(chapter, theme);
        }
    }

    /**
     * 生成封面内容
     */
    generateCoverContent(chapter, theme) {
        return `
        <div class="w-full h-screen flex items-center justify-center p-8">
            <div class="text-center animate-fade-in">
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

    /**
     * 生成介绍内容
     */
    generateIntroductionContent(chapter, theme) {
        return `
        <div class="w-full min-h-screen p-12">
            <div class="max-w-6xl mx-auto">
                <h1 class="text-5xl font-bold ${theme.text} mb-12 text-center animate-slide-up">
                    ${chapter.title}
                </h1>
                
                ${chapter.content ? this.generateContentSections(chapter.content, theme) : ''}
            </div>
        </div>`;
    }

    /**
     * 生成架构内容
     */
    generateArchitectureContent(chapter, theme) {
        const content = chapter.content;
        return `
        <div class="w-full min-h-screen p-12">
            <div class="max-w-6xl mx-auto">
                <h1 class="text-5xl font-bold ${theme.text} mb-12 text-center">
                    ${chapter.title}
                </h1>
                
                ${content.coreComponent ? `
                <div class="bg-gradient-to-r ${theme.accent} rounded-lg p-8 mb-6 text-center animate-scale-in">
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
                    <div class="${theme.cardBg} backdrop-blur-sm rounded-lg p-6 text-center border border-blue-600 animate-slide-up">
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
                    <div class="${theme.cardBg} backdrop-blur-sm rounded-lg p-6 border border-blue-600 text-center animate-scale-in">
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

    /**
     * 生成功能特性内容
     */
    generateFeaturesContent(chapter, theme) {
        const content = chapter.content;
        return `
        <div class="w-full min-h-screen flex">
            <div class="w-1/2 p-12 flex flex-col justify-center">
                <h1 class="text-5xl font-bold ${theme.text} mb-8 animate-slide-up">
                    ${chapter.title}
                </h1>
                
                ${content.mainFeatures ? `
                <div class="space-y-6">
                    ${content.mainFeatures.map(feature => `
                    <div class="${theme.cardBg} backdrop-blur-sm rounded-lg p-6 border border-blue-600 animate-scale-in">
                        <div class="flex items-start">
                            <div class="bg-gradient-to-r ${theme.secondary} rounded-full p-2 mr-4 mt-1">
                                ${feature.icon || ''}
                            </div>
                            <div>
                                <h3 class="text-xl font-bold ${theme.text} mb-2">
                                    ${feature.title}
                                </h3>
                                <p class="text-blue-100 leading-relaxed">
                                    ${feature.description}
                                </p>
                            </div>
                        </div>
                    </div>
                    `).join('')}
                </div>
                ` : ''}
            </div>

            <div class="w-1/2 p-12 flex flex-col justify-center">
                <h2 class="text-3xl font-bold text-blue-200 mb-8 animate-slide-up">
                    ${content.detailsTitle || '详细说明'}
                </h2>
                
                ${content.details ? `
                <div class="space-y-4">
                    ${content.details.map(detail => `
                    <div class="${theme.cardBg} backdrop-blur-sm rounded-lg p-4 border border-blue-600 animate-scale-in">
                        <h4 class="text-lg font-semibold ${theme.text} mb-2">
                            ${detail.title}
                        </h4>
                        <p class="text-blue-100 text-sm">
                            ${detail.description}
                        </p>
                    </div>
                    `).join('')}
                </div>
                ` : ''}
            </div>
        </div>`;
    }

    /**
     * 生成优势内容
     */
    generateAdvantagesContent(chapter, theme) {
        return this.generateDefaultContent(chapter, theme);
    }

    /**
     * 生成总结内容
     */
    generateSummaryContent(chapter, theme) {
        return `
        <div class="w-full min-h-screen p-12 flex items-center justify-center">
            <div class="max-w-4xl mx-auto text-center">
                <h1 class="text-5xl font-bold ${theme.text} mb-12 animate-slide-up">
                    ${chapter.title}
                </h1>
                
                ${chapter.content ? this.generateContentSections(chapter.content, theme) : ''}
                
                <div class="mt-16 animate-fade-in">
                    <h2 class="text-3xl font-bold text-blue-200 mb-8">谢谢观看</h2>
                    <div class="flex justify-center space-x-4">
                        <div class="w-16 h-1 bg-gradient-to-r ${theme.secondary} rounded-full"></div>
                        <div class="w-8 h-1 bg-gradient-to-r ${theme.accent} rounded-full"></div>
                        <div class="w-4 h-1 bg-blue-400 rounded-full"></div>
                    </div>
                </div>
            </div>
        </div>`;
    }

    /**
     * 生成默认内容
     */
    generateDefaultContent(chapter, theme) {
        return `
        <div class="w-full min-h-screen p-12">
            <div class="max-w-6xl mx-auto">
                <h1 class="text-5xl font-bold ${theme.text} mb-12 text-center animate-slide-up">
                    ${chapter.title}
                </h1>
                
                ${chapter.content ? this.generateContentSections(chapter.content, theme) : ''}
            </div>
        </div>`;
    }

    /**
     * 生成内容区域
     */
    generateContentSections(content, theme) {
        if (Array.isArray(content)) {
            return content.map(section => this.generateSection(section, theme)).join('');
        }
        if (typeof content === 'string') {
            return `<div class="text-xl text-blue-100 leading-relaxed animate-fade-in">${content}</div>`;
        }
        return this.generateSection(content, theme);
    }

    /**
     * 生成单个内容区域
     */
    generateSection(section, theme) {
        return `
        <div class="mb-8 animate-scale-in">
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

// 导出生成器
if (typeof module !== 'undefined' && module.exports) {
    module.exports = MultiFilePPTGenerator;
} else if (typeof window !== 'undefined') {
    window.MultiFilePPTGenerator = MultiFilePPTGenerator;
}

// 使用示例
const exampleConfig = {
    title: "RADOS: 可靠的分布式对象存储",
    subtitle: "Reliable Autonomic Distributed Object Store",
    theme: "technical",
    chapters: [
        {
            type: "cover",
            title: "RADOS",
            subtitle: "可靠的分布式对象存储",
            description: "现代化的分布式存储解决方案，为云计算和大数据提供可靠的基础设施。",
            slug: "cover"
        },
        {
            type: "introduction",
            title: "系统介绍",
            description: "RADOS系统概述",
            content: {
                title: "什么是RADOS",
                description: "RADOS (Reliable Autonomic Distributed Object Store) 是Ceph存储集群的基础，它是一个可靠的、自动化的、分布式的对象存储系统。",
                items: [
                    {
                        icon: "🏗️",
                        title: "分布式架构",
                        description: "采用分布式设计，支持水平扩展"
                    },
                    {
                        icon: "🔄",
                        title: "自动化管理",
                        description: "自动处理故障检测和数据恢复"
                    },
                    {
                        icon: "📦",
                        title: "对象存储",
                        description: "以对象形式存储数据，提供灵活性"
                    }
                ]
            },
            slug: "introduction"
        },
        {
            type: "architecture",
            title: "系统架构",
            description: "RADOS架构设计",
            content: {
                coreComponent: {
                    title: "🛡️ RADOS 核心层",
                    description: "Reliable Autonomic Distributed Object Store"
                },
                components: [
                    {
                        icon: "📊",
                        title: "OSD集群",
                        description: "物理存储设备管理"
                    },
                    {
                        icon: "🖥️",
                        title: "Monitor集群",
                        description: "集群状态监控管理"
                    }
                ],
                features: [
                    {
                        icon: "🔄",
                        title: "数据复制",
                        description: "自动数据复制确保高可用性"
                    },
                    {
                        icon: "⚡",
                        title: "CRUSH算法",
                        description: "智能数据分布和定位"
                    },
                    {
                        icon: "🛠️",
                        title: "自我修复",
                        description: "自动故障检测和恢复"
                    }
                ]
            },
            slug: "architecture"
        }
    ]
};

// 生成多文件PPT示例
// const generator = new MultiFilePPTGenerator();
// const files = generator.generatePPTFiles(exampleConfig);
// console.log('Generated files:', Object.keys(files));