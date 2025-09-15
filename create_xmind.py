#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
创建XMind格式的Web3.0架构文件
"""

import zipfile
import xml.etree.ElementTree as ET
from xml.dom import minidom
import os

def create_xmind_content():
    """创建XMind的content.xml内容"""
    
    # 创建根元素
    root = ET.Element("xmap-content", {
        "xmlns": "urn:xmind:xmap:xmlns:content:2.0",
        "version": "2.0"
    })
    
    # 创建sheet
    sheet = ET.SubElement(root, "sheet", {"id": "sheet1", "theme": "professional"})
    
    # 创建中心主题
    topic = ET.SubElement(sheet, "topic", {"id": "root"})
    title = ET.SubElement(topic, "title")
    title.text = "Web3.0 生态业务架构"
    
    # 创建子主题容器
    children = ET.SubElement(topic, "children")
    topics = ET.SubElement(children, "topics", {"type": "attached"})
    
    # L5: 接入层
    l5 = ET.SubElement(topics, "topic", {"id": "l5"})
    l5_title = ET.SubElement(l5, "title")
    l5_title.text = "L5: 接入层 (Access Layer)"
    l5_notes = ET.SubElement(l5, "notes")
    l5_plain = ET.SubElement(l5_notes, "plain")
    l5_plain.text = "用户与Web3交互的合规入口"
    
    l5_children = ET.SubElement(l5, "children")
    l5_topics = ET.SubElement(l5_children, "topics", {"type": "attached"})
    
    # 钱包
    wallets = ET.SubElement(l5_topics, "topic", {"id": "l5-wallets"})
    wallets_title = ET.SubElement(wallets, "title")
    wallets_title.text = "🔐 钱包 (Wallets)"
    
    wallets_children = ET.SubElement(wallets, "children")
    wallets_topics = ET.SubElement(wallets_children, "topics", {"type": "attached"})
    
    metamask = ET.SubElement(wallets_topics, "topic", {"id": "l5-metamask"})
    metamask_title = ET.SubElement(metamask, "title")
    metamask_title.text = "MetaMask (以太坊生态)"
    
    phantom = ET.SubElement(wallets_topics, "topic", {"id": "l5-phantom"})
    phantom_title = ET.SubElement(phantom, "title")
    phantom_title.text = "Phantom (Solana生态)"
    
    ledger = ET.SubElement(wallets_topics, "topic", {"id": "l5-ledger"})
    ledger_title = ET.SubElement(ledger, "title")
    ledger_title.text = "Ledger (硬件钱包)"
    
    # 合规网关
    compliance = ET.SubElement(l5_topics, "topic", {"id": "l5-compliance"})
    compliance_title = ET.SubElement(compliance, "title")
    compliance_title.text = "📋 合规网关"
    
    compliance_children = ET.SubElement(compliance, "children")
    compliance_topics = ET.SubElement(compliance_children, "topics", {"type": "attached"})
    
    securitize = ET.SubElement(compliance_topics, "topic", {"id": "l5-securitize"})
    securitize_title = ET.SubElement(securitize, "title")
    securitize_title.text = "Securitize (KYC/AML)"
    
    coinbase = ET.SubElement(compliance_topics, "topic", {"id": "l5-coinbase"})
    coinbase_title = ET.SubElement(coinbase, "title")
    coinbase_title.text = "Coinbase (中心化交易所)"
    
    # L4: 场景层
    l4 = ET.SubElement(topics, "topic", {"id": "l4"})
    l4_title = ET.SubElement(l4, "title")
    l4_title.text = "L4: 场景层 (Scene Layer)"
    l4_notes = ET.SubElement(l4, "notes")
    l4_plain = ET.SubElement(l4_notes, "plain")
    l4_plain.text = "落地应用"
    
    l4_children = ET.SubElement(l4, "children")
    l4_topics = ET.SubElement(l4_children, "topics", {"type": "attached"})
    
    # DeFi
    defi = ET.SubElement(l4_topics, "topic", {"id": "l4-defi"})
    defi_title = ET.SubElement(defi, "title")
    defi_title.text = "💰 DeFi (去中心化金融)"
    
    defi_children = ET.SubElement(defi, "children")
    defi_topics = ET.SubElement(defi_children, "topics", {"type": "attached"})
    
    trading = ET.SubElement(defi_topics, "topic", {"id": "l4-trading"})
    trading_title = ET.SubElement(trading, "title")
    trading_title.text = "交易所 (Uniswap, SushiSwap)"
    
    lending = ET.SubElement(defi_topics, "topic", {"id": "l4-lending"})
    lending_title = ET.SubElement(lending, "title")
    lending_title.text = "借贷 (Aave, Compound)"
    
    # GameFi
    gamefi = ET.SubElement(l4_topics, "topic", {"id": "l4-gamefi"})
    gamefi_title = ET.SubElement(gamefi, "title")
    gamefi_title.text = "🎮 GameFi / 元宇宙"
    
    gamefi_children = ET.SubElement(gamefi, "children")
    gamefi_topics = ET.SubElement(gamefi_children, "topics", {"type": "attached"})
    
    axie = ET.SubElement(gamefi_topics, "topic", {"id": "l4-axie"})
    axie_title = ET.SubElement(axie, "title")
    axie_title.text = "Axie Infinity"
    
    # L3: 组件层
    l3 = ET.SubElement(topics, "topic", {"id": "l3"})
    l3_title = ET.SubElement(l3, "title")
    l3_title.text = "L3: 组件层 (Component Layer)"
    l3_notes = ET.SubElement(l3, "notes")
    l3_plain = ET.SubElement(l3_notes, "plain")
    l3_plain.text = "封装金融协议与开发者工具"
    
    l3_children = ET.SubElement(l3, "children")
    l3_topics = ET.SubElement(l3_children, "topics", {"type": "attached"})
    
    # 稳定币 ⭐
    stablecoins = ET.SubElement(l3_topics, "topic", {"id": "l3-stablecoins"})
    stablecoins_title = ET.SubElement(stablecoins, "title")
    stablecoins_title.text = "💵 稳定币 (Stablecoins) ⭐"
    
    stablecoins_children = ET.SubElement(stablecoins, "children")
    stablecoins_topics = ET.SubElement(stablecoins_children, "topics", {"type": "attached"})
    
    usdc = ET.SubElement(stablecoins_topics, "topic", {"id": "l3-usdc"})
    usdc_title = ET.SubElement(usdc, "title")
    usdc_title.text = "USDC (Circle)"
    
    usdt = ET.SubElement(stablecoins_topics, "topic", {"id": "l3-usdt"})
    usdt_title = ET.SubElement(usdt, "title")
    usdt_title.text = "USDT (Tether)"
    
    # RWA ⭐
    rwa = ET.SubElement(l3_topics, "topic", {"id": "l3-rwa"})
    rwa_title = ET.SubElement(rwa, "title")
    rwa_title.text = "🏢 真实世界资产 (RWA) ⭐"
    
    rwa_children = ET.SubElement(rwa, "children")
    rwa_topics = ET.SubElement(rwa_children, "topics", {"type": "attached"})
    
    blackrock = ET.SubElement(rwa_topics, "topic", {"id": "l3-blackrock"})
    blackrock_title = ET.SubElement(blackrock, "title")
    blackrock_title.text = "BlackRock BUIDL"
    
    ondo = ET.SubElement(rwa_topics, "topic", {"id": "l3-ondo"})
    ondo_title = ET.SubElement(ondo, "title")
    ondo_title.text = "Ondo Finance"
    
    # L2: 中间件层
    l2 = ET.SubElement(topics, "topic", {"id": "l2"})
    l2_title = ET.SubElement(l2, "title")
    l2_title.text = "L2: 中间件层 (Middleware Layer)"
    l2_notes = ET.SubElement(l2, "notes")
    l2_plain = ET.SubElement(l2_notes, "plain")
    l2_plain.text = "扩展性能、跨链互通、链下数据接入"
    
    l2_children = ET.SubElement(l2, "children")
    l2_topics = ET.SubElement(l2_children, "topics", {"type": "attached"})
    
    # 零知识证明 ⭐
    zkp = ET.SubElement(l2_topics, "topic", {"id": "l2-zkp"})
    zkp_title = ET.SubElement(zkp, "title")
    zkp_title.text = "🔒 零知识证明 (ZKP) ⭐"
    
    zkp_children = ET.SubElement(zkp, "children")
    zkp_topics = ET.SubElement(zkp_children, "topics", {"type": "attached"})
    
    starkware = ET.SubElement(zkp_topics, "topic", {"id": "l2-starkware"})
    starkware_title = ET.SubElement(starkware, "title")
    starkware_title.text = "StarkWare (Starknet)"
    
    zksync = ET.SubElement(zkp_topics, "topic", {"id": "l2-zksync"})
    zksync_title = ET.SubElement(zksync, "title")
    zksync_title.text = "Matter Labs (zkSync)"
    
    # 跨链技术 ⭐
    crosschain = ET.SubElement(l2_topics, "topic", {"id": "l2-crosschain"})
    crosschain_title = ET.SubElement(crosschain, "title")
    crosschain_title.text = "🌉 跨链技术 (Cross-Chain) ⭐"
    
    crosschain_children = ET.SubElement(crosschain, "children")
    crosschain_topics = ET.SubElement(crosschain_children, "topics", {"type": "attached"})
    
    layerzero = ET.SubElement(crosschain_topics, "topic", {"id": "l2-layerzero"})
    layerzero_title = ET.SubElement(layerzero, "title")
    layerzero_title.text = "LayerZero"
    
    wormhole = ET.SubElement(crosschain_topics, "topic", {"id": "l2-wormhole"})
    wormhole_title = ET.SubElement(wormhole, "title")
    wormhole_title.text = "Wormhole"
    
    # 预言机 ⭐
    oracle = ET.SubElement(l2_topics, "topic", {"id": "l2-oracle"})
    oracle_title = ET.SubElement(oracle, "title")
    oracle_title.text = "🔮 预言机 (Oracle) ⭐"
    
    oracle_children = ET.SubElement(oracle, "children")
    oracle_topics = ET.SubElement(oracle_children, "topics", {"type": "attached"})
    
    chainlink = ET.SubElement(oracle_topics, "topic", {"id": "l2-chainlink"})
    chainlink_title = ET.SubElement(chainlink, "title")
    chainlink_title.text = "Chainlink (LINK) - 市场领导者"
    
    # L1: 区块链层
    l1 = ET.SubElement(topics, "topic", {"id": "l1"})
    l1_title = ET.SubElement(l1, "title")
    l1_title.text = "L1: 区块链层 (Blockchain Layer)"
    l1_notes = ET.SubElement(l1, "notes")
    l1_plain = ET.SubElement(l1_notes, "plain")
    l1_plain.text = "价值结算与智能合约执行"
    
    l1_children = ET.SubElement(l1, "children")
    l1_topics = ET.SubElement(l1_children, "topics", {"type": "attached"})
    
    # 公链平台 ⭐
    blockchains = ET.SubElement(l1_topics, "topic", {"id": "l1-blockchains"})
    blockchains_title = ET.SubElement(blockchains, "title")
    blockchains_title.text = "⛓️ 公链平台 ⭐"
    
    blockchains_children = ET.SubElement(blockchains, "children")
    blockchains_topics = ET.SubElement(blockchains_children, "topics", {"type": "attached"})
    
    ethereum = ET.SubElement(blockchains_topics, "topic", {"id": "l1-ethereum"})
    ethereum_title = ET.SubElement(ethereum, "title")
    ethereum_title.text = "以太坊 (ETH) - PoS共识"
    ethereum_notes = ET.SubElement(ethereum, "notes")
    ethereum_plain = ET.SubElement(ethereum_notes, "plain")
    ethereum_plain.text = "全球结算层，最大开发者生态"
    
    solana = ET.SubElement(blockchains_topics, "topic", {"id": "l1-solana"})
    solana_title = ET.SubElement(solana, "title")
    solana_title.text = "Solana (SOL) - PoH+PoS"
    solana_notes = ET.SubElement(solana, "notes")
    solana_plain = ET.SubElement(solana_notes, "plain")
    solana_plain.text = "高性能，65,000 TPS理论值"
    
    bitcoin = ET.SubElement(blockchains_topics, "topic", {"id": "l1-bitcoin"})
    bitcoin_title = ET.SubElement(bitcoin, "title")
    bitcoin_title.text = "比特币 (BTC) - PoW"
    bitcoin_notes = ET.SubElement(bitcoin, "notes")
    bitcoin_plain = ET.SubElement(bitcoin_notes, "plain")
    bitcoin_plain.text = "数字黄金，最去中心化"
    
    # 核心算法 ⭐
    algorithms = ET.SubElement(l1_topics, "topic", {"id": "l1-algorithms"})
    algorithms_title = ET.SubElement(algorithms, "title")
    algorithms_title.text = "🧮 核心算法 ⭐"
    
    algorithms_children = ET.SubElement(algorithms, "children")
    algorithms_topics = ET.SubElement(algorithms_children, "topics", {"type": "attached"})
    
    hash_func = ET.SubElement(algorithms_topics, "topic", {"id": "l1-hash"})
    hash_title = ET.SubElement(hash_func, "title")
    hash_title.text = "哈希函数 (SHA-256) ⭐"
    hash_notes = ET.SubElement(hash_func, "notes")
    hash_plain = ET.SubElement(hash_notes, "plain")
    hash_plain.text = "数据不可篡改性基石"
    
    # L0: 物理设施层
    l0 = ET.SubElement(topics, "topic", {"id": "l0"})
    l0_title = ET.SubElement(l0, "title")
    l0_title.text = "L0: 物理设施层 (Physical Infrastructure)"
    l0_notes = ET.SubElement(l0, "notes")
    l0_plain = ET.SubElement(l0_notes, "plain")
    l0_plain.text = "提供分布式网络基础资源"
    
    l0_children = ET.SubElement(l0, "children")
    l0_topics = ET.SubElement(l0_children, "topics", {"type": "attached"})
    
    # P2P网络 ⭐
    p2p = ET.SubElement(l0_topics, "topic", {"id": "l0-p2p"})
    p2p_title = ET.SubElement(p2p, "title")
    p2p_title.text = "🌐 P2P网络 ⭐"
    p2p_notes = ET.SubElement(p2p, "notes")
    p2p_plain = ET.SubElement(p2p_notes, "plain")
    p2p_plain.text = "去中心化通信协议基础"
    
    # 去中心化存储
    storage = ET.SubElement(l0_topics, "topic", {"id": "l0-storage"})
    storage_title = ET.SubElement(storage, "title")
    storage_title.text = "💾 去中心化存储"
    
    storage_children = ET.SubElement(storage, "children")
    storage_topics = ET.SubElement(storage_children, "topics", {"type": "attached"})
    
    ipfs = ET.SubElement(storage_topics, "topic", {"id": "l0-ipfs"})
    ipfs_title = ET.SubElement(ipfs, "title")
    ipfs_title.text = "IPFS"
    
    filecoin = ET.SubElement(storage_topics, "topic", {"id": "l0-filecoin"})
    filecoin_title = ET.SubElement(filecoin, "title")
    filecoin_title.text = "Filecoin (FIL)"
    
    return root

def create_manifest():
    """创建manifest.xml"""
    root = ET.Element("manifest", {
        "xmlns": "urn:xmind:xmap:xmlns:manifest:1.0",
        "password-hint": ""
    })
    
    file_entry = ET.SubElement(root, "file-entry", {
        "full-path": "content.xml",
        "media-type": "text/xml"
    })
    
    file_entry2 = ET.SubElement(root, "file-entry", {
        "full-path": "META-INF/",
        "media-type": ""
    })
    
    file_entry3 = ET.SubElement(root, "file-entry", {
        "full-path": "META-INF/manifest.xml",
        "media-type": "text/xml"
    })
    
    return root

def prettify_xml(elem):
    """美化XML输出"""
    rough_string = ET.tostring(elem, encoding='utf-8')
    reparsed = minidom.parseString(rough_string)
    return reparsed.toprettyxml(indent="  ", encoding='utf-8')

def create_xmind_file():
    """创建XMind文件"""
    
    # 创建临时目录
    temp_dir = "/tmp/xmind_temp"
    os.makedirs(temp_dir, exist_ok=True)
    os.makedirs(f"{temp_dir}/META-INF", exist_ok=True)
    
    # 创建content.xml
    content_root = create_xmind_content()
    content_xml = prettify_xml(content_root)
    
    with open(f"{temp_dir}/content.xml", 'wb') as f:
        f.write(content_xml)
    
    # 创建manifest.xml
    manifest_root = create_manifest()
    manifest_xml = prettify_xml(manifest_root)
    
    with open(f"{temp_dir}/META-INF/manifest.xml", 'wb') as f:
        f.write(manifest_xml)
    
    # 创建XMind文件（ZIP格式）
    xmind_path = "/workspace/Web3_Ecosystem_Architecture_Fixed.xmind"
    
    with zipfile.ZipFile(xmind_path, 'w', zipfile.ZIP_DEFLATED) as zipf:
        zipf.write(f"{temp_dir}/content.xml", "content.xml")
        zipf.write(f"{temp_dir}/META-INF/manifest.xml", "META-INF/manifest.xml")
    
    # 清理临时文件
    import shutil
    shutil.rmtree(temp_dir)
    
    print(f"✅ XMind文件已创建: {xmind_path}")

if __name__ == "__main__":
    create_xmind_file()