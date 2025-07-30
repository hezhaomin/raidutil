/**
 * PPT Generator with Tailwind CSS
 * 专业的PPT生成工具，支持技术演示文稿的自动化创建
 */

class PPTGenerator {
    constructor() {
        this.slides = [];
        this.currentSlide = 0;
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
        this.currentTheme = 'technical';
    }

    /**
     * 生成HTML PPT结构
     * @param {Object} config - PPT配置信息
     * @param {string} config.title - PPT标题
     * @param {string} config.subtitle - PPT副标题
     * @param {Array} config.slides - 幻灯片内容数组
     * @param {string} config.theme - 主题名称
     */
    generatePPT(config) {
        const { title, subtitle, slides, theme = 'technical' } = config;
        this.currentTheme = theme;
        
        return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
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
        .slide {
            display: none;
        }
        .slide.active {
            display: block;
        }
        .gradient-bg {
            background: linear-gradient(135deg, #1e3a8a 0%, #1e40af 50%, #2563eb 100%);
        }
    </style>
</head>
<body class="font-chinese overflow-hidden">
    ${this.generateTitleSlide(title, subtitle)}
    ${slides.map((slide, index) => this.generateSlide(slide, index + 1)).join('')}
    
    ${this.generateNavigation()}
    ${this.generateSlideCounter(slides.length + 1)}
    
    <script>
        ${this.generateJavaScript()}
    </script>
</body>
</html>`;
    }

    /**
     * 生成标题页
     */
    generateTitleSlide(title, subtitle) {
        const theme = this.themes[this.currentTheme];
        return `
    <!-- Title Slide -->
    <div class="slide active gradient-bg">
        <div class="w-full h-screen flex items-center justify-center">
            <div class="text-center animate-fade-in">
                <h1 class="text-6xl md:text-7xl font-bold ${theme.text} mb-8">
                    ${title}
                </h1>
                <p class="text-2xl md:text-3xl text-blue-200 mb-12">
                    ${subtitle}
                </p>
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
     * 生成普通幻灯片
     */
    generateSlide(slideData, index) {
        const { type, title, content } = slideData;
        
        switch (type) {
            case 'content':
                return this.generateContentSlide(title, content, index);
            case 'architecture':
                return this.generateArchitectureSlide(title, content, index);
            case 'features':
                return this.generateFeaturesSlide(title, content, index);
            case 'comparison':
                return this.generateComparisonSlide(title, content, index);
            default:
                return this.generateContentSlide(title, content, index);
        }
    }

    /**
     * 生成内容页面
     */
    generateContentSlide(title, content, index) {
        const theme = this.themes[this.currentTheme];
        return `
    <!-- Content Slide ${index} -->
    <div class="slide gradient-bg">
        <div class="w-full h-screen p-12">
            <h1 class="text-5xl font-bold ${theme.text} mb-12 text-center animate-slide-up">
                ${title}
            </h1>
            
            <div class="max-w-6xl mx-auto">
                ${this.generateContentSections(content)}
            </div>
        </div>
    </div>`;
    }

    /**
     * 生成架构页面
     */
    generateArchitectureSlide(title, content, index) {
        const theme = this.themes[this.currentTheme];
        return `
    <!-- Architecture Slide ${index} -->
    <div class="slide gradient-bg">
        <div class="w-full h-screen p-12">
            <h1 class="text-5xl font-bold ${theme.text} mb-12 text-center">
                ${title}
            </h1>
            
            <div class="max-w-6xl mx-auto">
                <div class="bg-gradient-to-r ${theme.accent} rounded-lg p-8 mb-6 text-center">
                    <h2 class="text-3xl font-bold ${theme.text} mb-4">
                        ${content.coreComponent.title}
                    </h2>
                    <p class="text-xl text-blue-100">
                        ${content.coreComponent.description}
                    </p>
                </div>

                <div class="grid grid-cols-2 gap-6 mb-8">
                    ${content.components.map(comp => `
                    <div class="${theme.cardBg} backdrop-blur-sm rounded-lg p-6 text-center border border-blue-600">
                        <h3 class="text-2xl font-bold ${theme.text} mb-2">
                            ${comp.icon} ${comp.title}
                        </h3>
                        <p class="text-gray-200">${comp.description}</p>
                    </div>
                    `).join('')}
                </div>

                <div class="grid grid-cols-3 gap-6">
                    ${content.features.map(feature => `
                    <div class="${theme.cardBg} backdrop-blur-sm rounded-lg p-6 border border-blue-600 text-center">
                        <h4 class="text-xl font-bold ${theme.text} mb-3">
                            ${feature.icon} ${feature.title}
                        </h4>
                        <p class="text-blue-100">${feature.description}</p>
                    </div>
                    `).join('')}
                </div>
            </div>
        </div>
    </div>`;
    }

    /**
     * 生成功能特性页面
     */
    generateFeaturesSlide(title, content, index) {
        const theme = this.themes[this.currentTheme];
        return `
    <!-- Features Slide ${index} -->
    <div class="slide gradient-bg">
        <div class="w-full h-screen flex">
            <div class="w-1/2 p-12 flex flex-col justify-center">
                <h1 class="text-5xl font-bold ${theme.text} mb-8">
                    ${title}
                </h1>
                
                <div class="space-y-6">
                    ${content.mainFeatures.map(feature => `
                    <div class="${theme.cardBg} backdrop-blur-sm rounded-lg p-6 border border-blue-600">
                        <div class="flex items-start">
                            <div class="bg-gradient-to-r ${theme.secondary} rounded-full p-2 mr-4 mt-1">
                                ${feature.icon}
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
            </div>

            <div class="w-1/2 p-12 flex flex-col justify-center">
                <h2 class="text-3xl font-bold text-blue-200 mb-8">
                    ${content.detailsTitle}
                </h2>
                
                <div class="space-y-4">
                    ${content.details.map(detail => `
                    <div class="${theme.cardBg} backdrop-blur-sm rounded-lg p-4 border border-blue-600">
                        <h4 class="text-lg font-semibold ${theme.text} mb-2">
                            ${detail.title}
                        </h4>
                        <p class="text-blue-100 text-sm">
                            ${detail.description}
                        </p>
                    </div>
                    `).join('')}
                </div>
            </div>
        </div>
    </div>`;
    }

    /**
     * 生成内容区域
     */
    generateContentSections(content) {
        if (Array.isArray(content)) {
            return content.map(section => this.generateSection(section)).join('');
        }
        return this.generateSection(content);
    }

    /**
     * 生成单个内容区域
     */
    generateSection(section) {
        const theme = this.themes[this.currentTheme];
        return `
        <div class="mb-8 animate-scale-in">
            <h2 class="text-3xl font-bold ${theme.text} mb-6">
                ${section.title}
            </h2>
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
        </div>`;
    }

    /**
     * 生成导航控件
     */
    generateNavigation() {
        return `
    <!-- Navigation -->
    <div class="fixed bottom-6 right-6 flex space-x-4 z-50">
        <button onclick="previousSlide()" class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-lg transition-all duration-300">
            ← 上一页
        </button>
        <button onclick="nextSlide()" class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-lg transition-all duration-300">
            下一页 →
        </button>
    </div>`;
    }

    /**
     * 生成幻灯片计数器
     */
    generateSlideCounter(totalSlides) {
        return `
    <!-- Slide counter -->
    <div class="fixed bottom-6 left-6 bg-black/50 text-white px-4 py-2 rounded-lg z-50">
        <span id="currentSlide">1</span> / <span id="totalSlides">${totalSlides}</span>
    </div>`;
    }

    /**
     * 生成JavaScript控制代码
     */
    generateJavaScript() {
        return `
        let currentSlideIndex = 0;
        const slides = document.querySelectorAll('.slide');
        const totalSlides = slides.length;
        
        document.getElementById('totalSlides').textContent = totalSlides;

        function showSlide(index) {
            slides.forEach(slide => slide.classList.remove('active'));
            slides[index].classList.add('active');
            document.getElementById('currentSlide').textContent = index + 1;
        }

        function nextSlide() {
            currentSlideIndex = (currentSlideIndex + 1) % totalSlides;
            showSlide(currentSlideIndex);
        }

        function previousSlide() {
            currentSlideIndex = (currentSlideIndex - 1 + totalSlides) % totalSlides;
            showSlide(currentSlideIndex);
        }

        // Keyboard navigation
        document.addEventListener('keydown', function(e) {
            if (e.key === 'ArrowRight' || e.key === ' ') {
                nextSlide();
            } else if (e.key === 'ArrowLeft') {
                previousSlide();
            } else if (e.key === 'Home') {
                currentSlideIndex = 0;
                showSlide(currentSlideIndex);
            } else if (e.key === 'End') {
                currentSlideIndex = totalSlides - 1;
                showSlide(currentSlideIndex);
            }
        });

        // Initialize
        showSlide(0);

        // Auto-advance slides (optional)
        function startAutoAdvance(interval = 30000) {
            setInterval(() => {
                nextSlide();
            }, interval);
        }
        
        // Uncomment to enable auto-advance
        // startAutoAdvance();
        `;
    }
}

// 导出PPT生成器
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PPTGenerator;
} else if (typeof window !== 'undefined') {
    window.PPTGenerator = PPTGenerator;
}

// 使用示例
const exampleConfig = {
    title: "RADOS: 可靠的分布式对象存储",
    subtitle: "Reliable Autonomic Distributed Object Store",
    theme: "technical",
    slides: [
        {
            type: "architecture",
            title: "RADOS 架构概览",
            content: {
                coreComponent: {
                    title: "🛡️ RADOS 核心层",
                    description: "Reliable Autonomic Distributed Object Store"
                },
                components: [
                    {
                        icon: "📊",
                        title: "OSD集群",
                        description: "物理存储设备"
                    },
                    {
                        icon: "🖥️",
                        title: "Monitor集群",
                        description: "集群状态管理"
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
            }
        },
        {
            type: "features",
            title: "核心功能特性",
            content: {
                mainFeatures: [
                    {
                        icon: '<svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20"><path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4z"/></svg>',
                        title: "对象存储",
                        description: "将所有数据以对象形式存储，每个对象都有唯一标识符并可包含元数据"
                    },
                    {
                        icon: '<svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20"><path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2z"/></svg>',
                        title: "数据分布",
                        description: "使用CRUSH算法动态计算数据存储位置，无需中心化查找表"
                    }
                ],
                detailsTitle: "技术优势",
                details: [
                    {
                        title: "高可扩展性",
                        description: "支持PB级数据存储，可动态扩展存储节点"
                    },
                    {
                        title: "数据一致性",
                        description: "通过复制和纠删码技术保证数据可靠性"
                    },
                    {
                        title: "自动恢复",
                        description: "自动检测故障并进行数据重平衡和修复"
                    }
                ]
            }
        }
    ]
};

// 如果在浏览器环境中，可以使用以下代码生成PPT
// const generator = new PPTGenerator();
// const pptHtml = generator.generatePPT(exampleConfig);
// console.log(pptHtml);