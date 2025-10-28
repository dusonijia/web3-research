#!/usr/bin/env python3
"""
Web3.0 生态业务架构图生成器
生成专业的PNG格式架构图
"""

import matplotlib
matplotlib.use('Agg')  # 使用非交互式后端
import matplotlib.pyplot as plt
import matplotlib.patches as mpatches
from matplotlib.patches import Rectangle, FancyBboxPatch
import numpy as np
from matplotlib import font_manager
import warnings
warnings.filterwarnings('ignore')

# 设置中文字体
plt.rcParams['font.sans-serif'] = ['DejaVu Sans', 'Arial Unicode MS', 'SimHei']
plt.rcParams['axes.unicode_minus'] = False

def create_web3_architecture():
    """创建Web3.0架构图"""
    fig, ax = plt.subplots(1, 1, figsize=(20, 14))
    
    # 定义颜色方案（麦肯锡风格）
    colors = {
        'L0': '#1e3a8a',  # 深蓝
        'L1': '#059669',  # 绿色
        'L2': '#dc2626',  # 红色
        'L3': '#7c2d12',  # 橙色
        'L4': '#581c87',  # 紫色
        'L5': '#be185d',  # 粉色
        'core': '#fbbf24', # 黄色（核心技术）
        'text': '#1f2937'  # 深灰（文字）
    }
    
    # 层级定义
    layers = [
        {
            'name': 'L5: 接入层 (Access Layer)',
            'subtitle': '用户与Web3交互的合规入口',
            'y': 10,
            'height': 1.5,
            'color': colors['L5'],
            'components': [
                '🔐 钱包 (MetaMask, Phantom, Ledger)',
                '📋 合规网关 (Securitize, Coinbase)',
                '🌐 DApp浏览器与聚合器'
            ]
        },
        {
            'name': 'L4: 场景层 (Scene Layer)',
            'subtitle': '落地应用',
            'y': 8,
            'height': 1.5,
            'color': colors['L4'],
            'components': [
                '💰 DeFi (Uniswap, Aave, Compound)',
                '🎮 GameFi/元宇宙 (Axie Infinity, Sandbox)',
                '👥 SocialFi (Lens Protocol)',
                '🏗️ DePIN (Helium Network)'
            ]
        },
        {
            'name': 'L3: 组件层 (Component Layer)',
            'subtitle': '封装金融协议与开发者工具',
            'y': 6,
            'height': 1.5,
            'color': colors['L3'],
            'components': [
                '💵 稳定币 ⭐ (USDC, USDT, DAI)',
                '🏢 RWA ⭐ (BlackRock BUIDL, Ondo Finance)',
                '🎨 NFT (OpenSea, Yuga Labs)',
                '🔧 DeFi协议原语 (Uniswap, Aave)'
            ]
        },
        {
            'name': 'L2: 中间件层 (Middleware Layer)',
            'subtitle': '扩展性能、跨链互通、链下数据接入',
            'y': 4,
            'height': 1.5,
            'color': colors['L2'],
            'components': [
                '🔒 零知识证明 ⭐ (StarkWare, zkSync, Scroll)',
                '🌉 跨链技术 ⭐ (LayerZero, Wormhole, Chainlink CCIP)',
                '🔮 预言机 ⭐ (Chainlink 领导者, Band Protocol)'
            ]
        },
        {
            'name': 'L1: 区块链层 (Blockchain Layer)',
            'subtitle': '价值结算与智能合约执行',
            'y': 2,
            'height': 1.5,
            'color': colors['L1'],
            'components': [
                '🏛️ 以太坊 ⭐ (ETH, PoS共识, 全球结算层)',
                '⚡ Solana ⭐ (SOL, PoH+PoS, 65,000 TPS)',
                '💎 比特币 ⭐ (BTC, PoW, 数字黄金)',
                '🧮 哈希算法 ⭐ (SHA-256, 数据不可篡改基石)'
            ]
        },
        {
            'name': 'L0: 物理设施层 (Physical Infrastructure)',
            'subtitle': '提供分布式网络基础资源',
            'y': 0,
            'height': 1.5,
            'color': colors['L0'],
            'components': [
                '🌐 P2P网络 ⭐ (去中心化通信协议基础)',
                '💾 去中心化存储 (IPFS, Filecoin)',
                '🏭 硬件制造商 (Bitmain, NVIDIA)',
                '🖥️ 节点运营商 (Infura, Alchemy)'
            ]
        }
    ]
    
    # 绘制层级
    for layer in layers:
        # 主层级背景
        rect = FancyBboxPatch(
            (0.5, layer['y']), 18, layer['height'],
            boxstyle="round,pad=0.1",
            facecolor=layer['color'],
            alpha=0.8,
            edgecolor='white',
            linewidth=2
        )
        ax.add_patch(rect)
        
        # 层级标题
        ax.text(1, layer['y'] + layer['height'] - 0.2, layer['name'], 
                fontsize=16, fontweight='bold', color='white', va='top')
        ax.text(1, layer['y'] + layer['height'] - 0.5, layer['subtitle'], 
                fontsize=12, color='white', va='top', style='italic')
        
        # 组件
        for i, component in enumerate(layer['components']):
            x_pos = 1 + (i % 2) * 9
            y_pos = layer['y'] + 0.6 - (i // 2) * 0.3
            
            # 检查是否为核心技术（带⭐）
            if '⭐' in component:
                # 核心技术高亮背景
                highlight_rect = FancyBboxPatch(
                    (x_pos - 0.1, y_pos - 0.1), 8.2, 0.25,
                    boxstyle="round,pad=0.05",
                    facecolor=colors['core'],
                    alpha=0.7,
                    edgecolor='none'
                )
                ax.add_patch(highlight_rect)
                text_color = colors['text']
            else:
                text_color = 'white'
            
            ax.text(x_pos, y_pos, component, fontsize=11, color=text_color, va='center')
    
    # 绘制连接箭头
    for i in range(len(layers) - 1):
        y_start = layers[i]['y']
        y_end = layers[i + 1]['y'] + layers[i + 1]['height']
        
        # 多个箭头表示数据流
        for x in [3, 9.5, 16]:
            ax.annotate('', xy=(x, y_start - 0.1), xytext=(x, y_end + 0.1),
                       arrowprops=dict(arrowstyle='->', lw=2, color='#6b7280'))
    
    # 添加标题和说明
    ax.text(9.5, 12.5, 'Web3.0 生态业务架构', 
            fontsize=24, fontweight='bold', ha='center', color=colors['text'])
    ax.text(9.5, 12, '分层架构与核心技术生态图', 
            fontsize=16, ha='center', color=colors['text'], style='italic')
    
    # 添加图例
    legend_elements = [
        mpatches.Patch(color=colors['core'], alpha=0.7, label='核心关键技术 ⭐'),
        mpatches.Patch(color=colors['L5'], label='L5: 接入层'),
        mpatches.Patch(color=colors['L4'], label='L4: 场景层'),
        mpatches.Patch(color=colors['L3'], label='L3: 组件层'),
        mpatches.Patch(color=colors['L2'], label='L2: 中间件层'),
        mpatches.Patch(color=colors['L1'], label='L1: 区块链层'),
        mpatches.Patch(color=colors['L0'], label='L0: 物理设施层')
    ]
    
    ax.legend(handles=legend_elements, loc='upper right', bbox_to_anchor=(0.98, 0.98))
    
    # 添加技术重要性说明
    importance_text = """
技术重要性评估维度：
• 使用范围：生态系统采用广度
• 技术先进性：创新程度与性能
• 共识程度：行业认可与标准化
• 未来潜力：发展前景与投资价值
    """
    ax.text(0.5, -1, importance_text, fontsize=10, va='top', 
            bbox=dict(boxstyle="round,pad=0.3", facecolor='#f3f4f6', alpha=0.8))
    
    # 设置坐标轴
    ax.set_xlim(0, 19)
    ax.set_ylim(-2, 13)
    ax.set_aspect('equal')
    ax.axis('off')
    
    plt.tight_layout()
    return fig

def create_market_analysis():
    """创建市场分析图"""
    fig, ((ax1, ax2), (ax3, ax4)) = plt.subplots(2, 2, figsize=(16, 12))
    
    # 1. 技术成熟度曲线
    technologies = ['P2P网络', '哈希算法', '比特币', '以太坊', '稳定币', 
                   'DeFi', '预言机', 'NFT', '跨链', '零知识证明', 'RWA', 'DePIN']
    maturity = [0.9, 0.95, 0.8, 0.85, 0.8, 0.7, 0.75, 0.6, 0.5, 0.4, 0.3, 0.2]
    adoption = [0.9, 0.9, 0.85, 0.8, 0.75, 0.6, 0.65, 0.5, 0.3, 0.2, 0.15, 0.1]
    
    colors_scatter = ['#1e3a8a' if m > 0.7 else '#059669' if m > 0.4 else '#dc2626' 
                     for m in maturity]
    
    scatter = ax1.scatter(maturity, adoption, s=[100]*len(technologies), 
                         c=colors_scatter, alpha=0.7)
    
    for i, txt in enumerate(technologies):
        ax1.annotate(txt, (maturity[i], adoption[i]), xytext=(5, 5), 
                    textcoords='offset points', fontsize=9)
    
    ax1.set_xlabel('技术成熟度')
    ax1.set_ylabel('市场采用度')
    ax1.set_title('Web3.0 技术成熟度 vs 市场采用度')
    ax1.grid(True, alpha=0.3)
    
    # 2. 市场规模预测
    years = np.array([2023, 2024, 2025, 2026, 2027, 2028])
    defi_market = np.array([100, 150, 250, 400, 600, 900])
    nft_market = np.array([20, 25, 40, 70, 120, 200])
    rwa_market = np.array([5, 15, 50, 150, 400, 800])
    gamefi_market = np.array([10, 20, 40, 80, 150, 300])
    
    ax2.plot(years, defi_market, marker='o', linewidth=3, label='DeFi', color='#059669')
    ax2.plot(years, rwa_market, marker='s', linewidth=3, label='RWA', color='#dc2626')
    ax2.plot(years, nft_market, marker='^', linewidth=3, label='NFT', color='#7c2d12')
    ax2.plot(years, gamefi_market, marker='D', linewidth=3, label='GameFi', color='#581c87')
    
    ax2.set_xlabel('年份')
    ax2.set_ylabel('市场规模 (十亿美元)')
    ax2.set_title('Web3.0 细分市场规模预测')
    ax2.legend()
    ax2.grid(True, alpha=0.3)
    
    # 3. 投资热度分析
    sectors = ['基础设施', 'DeFi', 'NFT/GameFi', 'Web3社交', 'RWA', 'ZK技术', 'DePIN']
    investment_2023 = [2.5, 1.8, 0.8, 0.5, 1.2, 2.0, 0.7]
    investment_2024 = [3.2, 2.1, 1.2, 0.8, 2.8, 3.5, 1.5]
    
    x = np.arange(len(sectors))
    width = 0.35
    
    bars1 = ax3.bar(x - width/2, investment_2023, width, label='2023', color='#6b7280', alpha=0.8)
    bars2 = ax3.bar(x + width/2, investment_2024, width, label='2024', color='#059669', alpha=0.8)
    
    ax3.set_xlabel('细分领域')
    ax3.set_ylabel('投资金额 (十亿美元)')
    ax3.set_title('Web3.0 各领域投资热度对比')
    ax3.set_xticks(x)
    ax3.set_xticklabels(sectors, rotation=45, ha='right')
    ax3.legend()
    ax3.grid(True, alpha=0.3, axis='y')
    
    # 4. 技术发展阶段
    stages = ['实验室', '原型', '测试网', '主网', '规模化', '主流采用']
    stage_counts = [15, 25, 30, 45, 20, 8]
    colors_pie = ['#fee2e2', '#fecaca', '#fca5a5', '#f87171', '#ef4444', '#dc2626']
    
    wedges, texts, autotexts = ax4.pie(stage_counts, labels=stages, colors=colors_pie,
                                      autopct='%1.1f%%', startangle=90)
    ax4.set_title('Web3.0 项目发展阶段分布')
    
    plt.tight_layout()
    return fig

if __name__ == "__main__":
    # 生成主架构图
    print("正在生成Web3.0架构图...")
    fig1 = create_web3_architecture()
    fig1.savefig('/workspace/Web3_Architecture.png', dpi=300, bbox_inches='tight', 
                facecolor='white', edgecolor='none')
    print("✅ 主架构图已保存: Web3_Architecture.png")
    
    # 生成市场分析图
    print("正在生成市场分析图...")
    fig2 = create_market_analysis()
    fig2.savefig('/workspace/Web3_Market_Analysis.png', dpi=300, bbox_inches='tight',
                facecolor='white', edgecolor='none')
    print("✅ 市场分析图已保存: Web3_Market_Analysis.png")
    
    print("\n🎉 所有图表生成完成！")
    print("📁 文件位置:")
    print("   - Web3_Architecture.png (主架构图)")
    print("   - Web3_Market_Analysis.png (市场分析图)")
    
    # plt.show()  # 移除显示以避免超时