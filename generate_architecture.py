#!/usr/bin/env python3
"""
Generate System Architecture Diagram for Multi-Agent Framework
"""

import matplotlib.pyplot as plt
import matplotlib.patches as patches
from matplotlib.patches import FancyBboxPatch, ConnectionPatch, Rectangle
import numpy as np

# Set up the figure with high DPI for publication quality
plt.rcParams['font.family'] = 'Arial'
plt.rcParams['font.size'] = 10
plt.rcParams['figure.dpi'] = 300

fig, ax = plt.subplots(1, 1, figsize=(14, 10))
ax.set_xlim(0, 14)
ax.set_ylim(0, 10)
ax.axis('off')

# Define colors
colors = {
    'parser': '#E8F4FD',
    'parser_border': '#2196F3',
    'knowledge': '#E8F5E8',
    'knowledge_border': '#4CAF50',
    'rl': '#FFF3E0',
    'rl_border': '#FF9800',
    'input': '#F3E5F5',
    'input_border': '#9C27B0',
    'output': '#FFEBEE',
    'output_border': '#F44336',
    'flow': '#666666'
}

# Title
ax.text(7, 9.5, 'Multi-Agent Framework Architecture', 
        fontsize=16, fontweight='bold', ha='center')

# Input Documents Section
input_box = FancyBboxPatch((0.5, 7.5), 3, 1.5, 
                          boxstyle="round,pad=0.1", 
                          facecolor=colors['input'], 
                          edgecolor=colors['input_border'], 
                          linewidth=2)
ax.add_patch(input_box)
ax.text(2, 8.6, 'Input Documents', fontsize=12, fontweight='bold', ha='center')
ax.text(2, 8.2, '• PDF, DOCX, HTML', fontsize=9, ha='center')
ax.text(2, 7.9, '• Scanned Images', fontsize=9, ha='center')
ax.text(2, 7.6, '• Multi-modal Content', fontsize=9, ha='center')

# Parser Agent Section
parser_box = FancyBboxPatch((0.5, 5), 4, 2, 
                           boxstyle="round,pad=0.1", 
                           facecolor=colors['parser'], 
                           edgecolor=colors['parser_border'], 
                           linewidth=2)
ax.add_patch(parser_box)
ax.text(2.5, 6.7, 'Parser Agent', fontsize=12, fontweight='bold', ha='center')
ax.text(2.5, 6.4, 'Multi-Modal Document Understanding', fontsize=10, ha='center', style='italic')

# Parser Agent components
ax.text(1, 6.0, '• Document Ingestion', fontsize=9, ha='left')
ax.text(1, 5.7, '• Content Classification', fontsize=9, ha='left')
ax.text(1, 5.4, '• Text/Table/Figure Processing', fontsize=9, ha='left')
ax.text(1, 5.1, '• Structured Output Generation', fontsize=9, ha='left')

# Knowledge Extraction Agent Section
knowledge_box = FancyBboxPatch((5.5, 5), 4, 2, 
                              boxstyle="round,pad=0.1", 
                              facecolor=colors['knowledge'], 
                              edgecolor=colors['knowledge_border'], 
                              linewidth=2)
ax.add_patch(knowledge_box)
ax.text(7.5, 6.7, 'Knowledge Extraction Agent', fontsize=12, fontweight='bold', ha='center')
ax.text(7.5, 6.4, 'LLM-based Extraction & IP Detection', fontsize=10, ha='center', style='italic')

# Knowledge Agent components
ax.text(6, 6.0, '• GPT-4 + LoRA Fine-tuning', fontsize=9, ha='left')
ax.text(6, 5.7, '• Chain-of-Thought Prompting', fontsize=9, ha='left')
ax.text(6, 5.4, '• Knowledge Triple Extraction', fontsize=9, ha='left')
ax.text(6, 5.1, '• IP Classification & Novelty', fontsize=9, ha='left')

# RL Prompt Optimizer Section
rl_box = FancyBboxPatch((10.5, 5), 3, 2, 
                       boxstyle="round,pad=0.1", 
                       facecolor=colors['rl'], 
                       edgecolor=colors['rl_border'], 
                       linewidth=2)
ax.add_patch(rl_box)
ax.text(12, 6.7, 'RL Prompt Optimizer', fontsize=12, fontweight='bold', ha='center')
ax.text(12, 6.4, 'Dynamic Optimization', fontsize=10, ha='center', style='italic')

# RL components
ax.text(11, 6.0, '• PPO Algorithm', fontsize=9, ha='left')
ax.text(11, 5.7, '• MDP Formulation', fontsize=9, ha='left')
ax.text(11, 5.4, '• Reward Function', fontsize=9, ha='left')
ax.text(11, 5.1, '• Policy Learning', fontsize=9, ha='left')

# Output Section
output_box = FancyBboxPatch((4, 2), 6, 1.5, 
                           boxstyle="round,pad=0.1", 
                           facecolor=colors['output'], 
                           edgecolor=colors['output_border'], 
                           linewidth=2)
ax.add_patch(output_box)
ax.text(7, 3.1, 'Extracted Knowledge & IP Detection Results', 
        fontsize=12, fontweight='bold', ha='center')
ax.text(5, 2.6, '• Knowledge Triples', fontsize=9, ha='left')
ax.text(5, 2.3, '• IP Classifications', fontsize=9, ha='left')
ax.text(8.5, 2.6, '• Novelty Scores', fontsize=9, ha='left')
ax.text(8.5, 2.3, '• Confidence Metrics', fontsize=9, ha='left')

# Data Flow Arrows
# Input to Parser
arrow1 = ConnectionPatch((2, 7.5), (2.5, 7), "data", "data",
                        arrowstyle="->", shrinkA=5, shrinkB=5, 
                        mutation_scale=20, fc=colors['flow'], ec=colors['flow'], lw=2)
ax.add_patch(arrow1)

# Parser to Knowledge
arrow2 = ConnectionPatch((4.5, 6), (5.5, 6), "data", "data",
                        arrowstyle="->", shrinkA=5, shrinkB=5, 
                        mutation_scale=20, fc=colors['flow'], ec=colors['flow'], lw=2)
ax.add_patch(arrow2)

# Knowledge to RL (feedback loop)
arrow3 = ConnectionPatch((9.5, 6.5), (10.5, 6.5), "data", "data",
                        arrowstyle="->", shrinkA=5, shrinkB=5, 
                        mutation_scale=20, fc=colors['flow'], ec=colors['flow'], lw=2)
ax.add_patch(arrow3)

# RL back to Knowledge (optimization)
arrow4 = ConnectionPatch((10.5, 5.5), (9.5, 5.5), "data", "data",
                        arrowstyle="->", shrinkA=5, shrinkB=5, 
                        mutation_scale=20, fc=colors['rl_border'], ec=colors['rl_border'], lw=2)
ax.add_patch(arrow4)

# Knowledge to Output
arrow5 = ConnectionPatch((7.5, 5), (7, 3.5), "data", "data",
                        arrowstyle="->", shrinkA=5, shrinkB=5, 
                        mutation_scale=20, fc=colors['flow'], ec=colors['flow'], lw=2)
ax.add_patch(arrow5)

# Add coordination arrows between agents
coord_arrow1 = ConnectionPatch((2.5, 5), (2.5, 4.2), "data", "data",
                              arrowstyle="<->", shrinkA=5, shrinkB=5, 
                              mutation_scale=15, fc='blue', ec='blue', lw=1.5, alpha=0.7)
ax.add_patch(coord_arrow1)

coord_arrow2 = ConnectionPatch((7.5, 5), (7.5, 4.2), "data", "data",
                              arrowstyle="<->", shrinkA=5, shrinkB=5, 
                              mutation_scale=15, fc='blue', ec='blue', lw=1.5, alpha=0.7)
ax.add_patch(coord_arrow2)

coord_arrow3 = ConnectionPatch((12, 5), (12, 4.2), "data", "data",
                              arrowstyle="<->", shrinkA=5, shrinkB=5, 
                              mutation_scale=15, fc='blue', ec='blue', lw=1.5, alpha=0.7)
ax.add_patch(coord_arrow3)

# Coordination line
ax.plot([2.5, 12], [4.2, 4.2], 'b--', alpha=0.7, linewidth=1.5)
ax.text(7.25, 3.9, 'Agent Coordination & Communication', 
        fontsize=9, ha='center', color='blue', style='italic')

# Add technical details boxes
tech_box1 = Rectangle((0.5, 0.2), 4, 1.2, facecolor='#F8F9FA', 
                     edgecolor='#6C757D', linewidth=1)
ax.add_patch(tech_box1)
ax.text(2.5, 1.1, 'Technical Features', fontsize=10, fontweight='bold', ha='center')
ax.text(1, 0.8, '• Multi-modal Processing (CLIP + LayoutLMv3)', fontsize=8, ha='left')
ax.text(1, 0.6, '• Dynamic Prompt Engineering', fontsize=8, ha='left')
ax.text(1, 0.4, '• Reinforcement Learning Optimization', fontsize=8, ha='left')

tech_box2 = Rectangle((5, 0.2), 4, 1.2, facecolor='#F8F9FA', 
                     edgecolor='#6C757D', linewidth=1)
ax.add_patch(tech_box2)
ax.text(7, 1.1, 'Performance Metrics', fontsize=10, fontweight='bold', ha='center')
ax.text(5.5, 0.8, '• Knowledge Extraction F1: 89.3%', fontsize=8, ha='left')
ax.text(5.5, 0.6, '• IP Detection F1: 87.6%', fontsize=8, ha='left')
ax.text(5.5, 0.4, '• Average Latency: 156ms', fontsize=8, ha='left')

tech_box3 = Rectangle((9.5, 0.2), 4, 1.2, facecolor='#F8F9FA', 
                     edgecolor='#6C757D', linewidth=1)
ax.add_patch(tech_box3)
ax.text(11.5, 1.1, 'Dataset & Evaluation', fontsize=10, fontweight='bold', ha='center')
ax.text(10, 0.8, '• IPBench-Extended: 15,847 samples', fontsize=8, ha='left')
ax.text(10, 0.6, '• 12 IP categories, 25 tasks', fontsize=8, ha='left')
ax.text(10, 0.4, '• Multi-domain, Multi-lingual', fontsize=8, ha='left')

# Add legend for arrow types
legend_box = Rectangle((11, 8.5), 2.5, 1, facecolor='white', 
                      edgecolor='black', linewidth=1)
ax.add_patch(legend_box)
ax.text(12.25, 9.2, 'Legend', fontsize=10, fontweight='bold', ha='center')
ax.plot([11.2, 11.6], [8.9, 8.9], color=colors['flow'], linewidth=2)
ax.text(11.8, 8.9, 'Data Flow', fontsize=8, va='center')
ax.plot([11.2, 11.6], [8.7, 8.7], color=colors['rl_border'], linewidth=2)
ax.text(11.8, 8.7, 'Optimization', fontsize=8, va='center')

plt.tight_layout()
plt.savefig('system_architecture.png', dpi=300, bbox_inches='tight', 
            facecolor='white', edgecolor='none')
plt.close()

print("System architecture diagram saved as 'system_architecture.png'")