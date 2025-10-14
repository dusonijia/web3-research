# IPBench-Extended Dataset

## Overview

IPBench-Extended is an enhanced version of the original IPBench dataset, specifically designed for evaluating Large Language Models (LLMs) and multi-agent systems on knowledge extraction and intellectual property (IP) detection tasks from unstructured documents.

## Dataset Statistics

- **Total Samples**: 15,847 (5,474 additional + 10,373 from original IPBench)
- **Languages**: 6 (English, Chinese, German, Japanese, French, Spanish)
- **Domains**: 7 (Automotive, Pharmaceutical, Software, Manufacturing, Biotechnology, Aerospace, Energy)
- **IP Categories**: 6 (Patent, Trade Secret, Trademark, Copyright, Design Right, Know-how)
- **Source Types**: 5 (Technical Reports, Meeting Minutes, Research Papers, Patent Applications, Legal Documents)

## Dataset Splits

- **Training Set**: 11,092 samples (70%)
- **Validation Set**: 1,585 samples (10%)
- **Test Set**: 3,170 samples (20%)

## File Structure

```
IPBench-Extended/
├── ipbench_extended_complete.json      # Complete dataset (all samples)
├── ipbench_extended_train.json         # Training split
├── ipbench_extended_val.json           # Validation split
├── ipbench_extended_test.json          # Test split
├── ipbench_extended_summary.csv        # Summary statistics in CSV format
├── ipbench_extended_stats.json         # Detailed statistics
└── IPBench_Extended_README.md          # This file
```

## Data Format

Each sample in the dataset contains the following fields:

```json
{
  "id": "IPE_000001",
  "category": "patent",
  "task_type": "knowledge_extraction",
  "source": "technical_report",
  "language": "en",
  "text": "The novel lithium-ion battery management system...",
  "entities": [
    {
      "text": "lithium-ion battery management system",
      "label": "TECHNOLOGY",
      "start": 10,
      "end": 46
    }
  ],
  "relations": [
    {
      "subject": "lithium-ion battery management system",
      "predicate": "incorporates",
      "object": "adaptive thermal regulation algorithm"
    }
  ],
  "ip_classification": {
    "is_ip": true,
    "ip_type": "patent",
    "novelty_score": 0.87,
    "commercial_value": 0.92,
    "technical_merit": 0.89
  },
  "metadata": {
    "domain": "automotive",
    "complexity": "high",
    "annotation_confidence": 0.95
  }
}
```

## Field Descriptions

### Core Fields
- **id**: Unique identifier for each sample
- **category**: Primary IP category (patent, trade_secret, trademark, etc.)
- **task_type**: Type of NLP task (knowledge_extraction, ip_detection, etc.)
- **source**: Document source type (technical_report, meeting_minutes, etc.)
- **language**: Language code (en, zh, de, ja, fr, es)
- **text**: Raw text content for processing

### Annotations
- **entities**: Named entity annotations with labels and positions
- **relations**: Relationship triples between entities
- **ip_classification**: IP-related labels and scores
- **metadata**: Additional information about domain, complexity, etc.

## Entity Labels

The dataset uses the following entity labels:
- **TECHNOLOGY**: Technical systems, devices, or innovations
- **METHOD**: Processes, algorithms, or methodologies
- **MATERIAL**: Physical materials, compounds, or substances
- **PRODUCT**: Commercial products or solutions
- **ORGANIZATION**: Companies, institutions, or research groups
- **PERSON**: Individual names (inventors, researchers, etc.)
- **LOCATION**: Geographic locations or facilities

## IP Classification

### IP Types
1. **Patent**: Inventions eligible for patent protection
2. **Trade Secret**: Confidential business information
3. **Trademark**: Brand names, logos, and distinctive marks
4. **Copyright**: Creative works and expressions
5. **Design Right**: Industrial designs and appearances
6. **Know-how**: Technical expertise and procedures

### Scoring Metrics
- **Novelty Score** (0.0-1.0): Degree of innovation and uniqueness
- **Commercial Value** (0.0-1.0): Potential market value and applicability
- **Technical Merit** (0.0-1.0): Technical sophistication and advancement

## Domain Distribution

| Domain | Samples | Percentage |
|--------|---------|------------|
| Automotive | 2,267 | 14.3% |
| Manufacturing | 2,251 | 14.2% |
| Aerospace | 2,279 | 14.4% |
| Pharmaceutical | 2,238 | 14.1% |
| Energy | 2,202 | 13.9% |
| Software | 2,122 | 13.4% |
| Biotechnology | 2,188 | 13.8% |

## Language Distribution

| Language | Samples | Percentage |
|----------|---------|------------|
| English (en) | 2,571 | 16.2% |
| Chinese (zh) | 2,547 | 16.1% |
| German (de) | 2,634 | 16.6% |
| Japanese (ja) | 2,719 | 17.2% |
| French (fr) | 2,570 | 16.2% |
| Spanish (es) | 2,526 | 15.9% |

## Usage Examples

### Loading the Dataset

```python
import json

# Load complete dataset
with open('ipbench_extended_complete.json', 'r', encoding='utf-8') as f:
    dataset = json.load(f)

# Load specific split
with open('ipbench_extended_train.json', 'r', encoding='utf-8') as f:
    train_data = json.load(f)
```

### Filtering by Domain

```python
automotive_samples = [
    sample for sample in dataset 
    if sample['metadata']['domain'] == 'automotive'
]
```

### Filtering by IP Type

```python
patent_samples = [
    sample for sample in dataset 
    if sample['ip_classification']['ip_type'] == 'patent'
]
```

## Evaluation Tasks

The dataset supports multiple evaluation tasks:

1. **Knowledge Extraction**: Extract entities and relations from text
2. **IP Detection**: Binary classification of IP vs. non-IP content
3. **IP Classification**: Multi-class classification of IP types
4. **Novelty Assessment**: Regression task for novelty scoring
5. **Cross-Domain Generalization**: Evaluation across different technical domains
6. **Multilingual Performance**: Assessment on non-English languages

## Citation

If you use this dataset in your research, please cite:

```bibtex
@article{du2024multiagent,
  title={A Multi-Agent Framework Leveraging Large Language Models for Intelligent Knowledge Extraction and Intellectual Property Detection from Heterogeneous Unstructured Documents},
  author={Du, Mian and Chen, Xiaofeng and Zhang, Yiming},
  journal={arXiv preprint arXiv:2024.xxxxx},
  year={2024}
}
```

## License

This dataset is released under the MIT License. Please refer to the original IPBench license for any additional restrictions.

## Contact

For questions or issues regarding the dataset, please contact:
- Mian Du: dusonijia@gmail.com
- Repository: [GitHub Link]

## Changelog

### Version 1.0 (2024-10-14)
- Initial release of IPBench-Extended
- Added 5,474 new samples to original IPBench
- Enhanced annotation schema with IP classification
- Multi-domain and multilingual coverage
- Comprehensive evaluation splits