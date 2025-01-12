import React, { useState } from 'react';
import { AgentCharacter, CharacterTemplate } from '../types';
import { Bot, Brain, MessageSquare, Sparkles, ChevronRight, Save, ArrowLeft, Check, Plus } from 'lucide-react';

const characterTemplates: CharacterTemplate[] = [
  {
    id: 'defi-expert',
    name: 'DeFi Maximalist',
    description: 'Specializes in yield farming and protocol optimization',
    bio: 'Former TradFi analyst turned DeFi maximalist. Transaction history is their diary and smart contract interactions tell stories.',
    traits: ['analytical', 'efficient', 'strategic'],
    expertise: ['yield farming', 'tokenomics', 'protocol governance'],
    icon: '🔄'
  },
  {
    id: 'security-expert',
    name: 'Security Guardian',
    description: 'Focuses on wallet security and smart contract auditing',
    bio: 'Zero-knowledge proof enthusiast with a knack for optimizing gas fees. Believes in the power of decentralized systems.',
    traits: ['security-conscious', 'precise', 'reliable'],
    expertise: ['smart contracts', 'wallet security', 'zero-knowledge proofs'],
    icon: '🛡️'
  },
  {
    id: 'trading-expert',
    name: 'Trading Strategist',
    description: 'Expert in market analysis and trading strategies',
    bio: 'Blockchain explorer by day, MEV researcher by night. Analytics dashboards are more art than science.',
    traits: ['strategic', 'analytical', 'innovative'],
    expertise: ['MEV', 'arbitrage', 'market making'],
    icon: '📊'
  }
];

const communicationStyles = [
  { id: 'technical', label: 'Technical and precise', description: 'Focuses on accuracy and detailed explanations' },
  { id: 'friendly', label: 'Friendly and approachable', description: 'Uses conversational language and relatable examples' },
  { id: 'educational', label: 'Educational focus', description: 'Emphasizes learning and skill development' },
  { id: 'professional', label: 'Professional and formal', description: 'Maintains a business-like approach' }
];

export const CharacterBuilder: React.FC = () => {
  const [step, setStep] = useState(1);
  const [selectedTemplate, setSelectedTemplate] = useState<CharacterTemplate | null>(null);
  const [character, setCharacter] = useState<AgentCharacter>({
    name: '',
    bio: '',
    traits: [],
    expertise: [],
    style: {
      language: [],
      communication: []
    },
    lore: []
  });

  const handleTemplateSelect = (template: CharacterTemplate) => {
    setSelectedTemplate(template);
    setCharacter(prev => ({
      ...prev,
      name: template.name,
      bio: template.bio,
      traits: template.traits,
      expertise: template.expertise
    }));
    setStep(2);
  };

  const handleSave = () => {
    console.log('Saving character:', character);
  };

  return (
    <div className="flex-1 overflow-y-auto bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/20 via-gray-900 to-black text-white p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              {step > 1 && (
                <button
                  onClick={() => setStep(1)}
                  className="p-2 hover:bg-white/5 rounded-lg transition-colors"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
              )}
              <h1 className="text-3xl font-bold font-display bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
                {step === 1 ? 'Choose Your Agent Template' : 'Customize Your Agent'}
              </h1>
            </div>
            <p className="text-gray-400">
              {step === 1 
                ? 'Select a base template to start with. You can customize it in the next step.'
                : 'Fine-tune your agent\'s personality, expertise, and communication style.'}
            </p>
          </div>
          
          {step === 2 && (
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 rounded-xl transition-all shadow-lg shadow-indigo-500/20"
            >
              <Save className="w-4 h-4" />
              <span className="font-medium">Save Character</span>
            </button>
          )}
        </div>

        {/* Progress Steps */}
        <div className="flex items-center gap-4 mb-8">
          <div className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              step >= 1 ? 'bg-indigo-500 text-white' : 'bg-gray-700 text-gray-400'
            }`}>
              <Check className="w-4 h-4" />
            </div>
            <span className={step >= 1 ? 'text-white' : 'text-gray-400'}>Choose Template</span>
          </div>
          <div className={`flex-1 h-0.5 ${step >= 2 ? 'bg-indigo-500' : 'bg-gray-700'}`} />
          <div className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              step >= 2 ? 'bg-indigo-500 text-white' : 'bg-gray-700 text-gray-400'
            }`}>
              {step >= 2 ? <Check className="w-4 h-4" /> : '2'}
            </div>
            <span className={step >= 2 ? 'text-white' : 'text-gray-400'}>Customize</span>
          </div>
        </div>

        {/* Template Selection */}
        {step === 1 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {characterTemplates.map(template => (
              <button
                key={template.id}
                onClick={() => handleTemplateSelect(template)}
                className="group relative bg-black/40 backdrop-blur-xl hover:bg-black/60 rounded-2xl p-6 text-left border border-white/10 transition-all hover:border-indigo-500/50 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <div className="relative">
                  <div className="text-3xl mb-3">{template.icon}</div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {template.name}
                  </h3>
                  <p className="text-gray-400 mb-4 min-h-[3rem]">
                    {template.description}
                  </p>
                  
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wider mb-1.5">Expertise</p>
                      <div className="flex flex-wrap gap-2">
                        {template.expertise.map((skill, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-indigo-500/20 text-indigo-300 rounded-full text-xs"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wider mb-1.5">Traits</p>
                      <div className="flex flex-wrap gap-2">
                        {template.traits.map((trait, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded-full text-xs"
                          >
                            {trait}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="absolute bottom-6 right-6">
                    <div className="flex items-center text-indigo-400 text-sm font-medium">
                      Customize
                      <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}

        {/* Customization Form */}
        {step === 2 && selectedTemplate && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Column - Basic Info */}
            <div className="space-y-6">
              <div className="bg-black/40 backdrop-blur-xl rounded-2xl border border-white/10 p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Bot className="w-5 h-5 text-indigo-400" />
                  Basic Information
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Agent Name
                    </label>
                    <input
                      type="text"
                      value={character.name}
                      onChange={e => setCharacter(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-indigo-500 transition-colors"
                      placeholder="Enter agent name..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Bio
                    </label>
                    <textarea
                      value={character.bio}
                      onChange={e => setCharacter(prev => ({ ...prev, bio: e.target.value }))}
                      rows={4}
                      className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-indigo-500 transition-colors resize-none"
                      placeholder="Write a brief description of your agent..."
                    />
                  </div>
                </div>
              </div>

              <div className="bg-black/40 backdrop-blur-xl rounded-2xl border border-white/10 p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Brain className="w-5 h-5 text-purple-400" />
                  Expertise & Traits
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Areas of Expertise
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {character.expertise.map((skill, index) => (
                        <span
                          key={index}
                          className="px-3 py-1.5 bg-indigo-500/20 text-indigo-300 rounded-full text-sm flex items-center gap-1 group"
                        >
                          {skill}
                          <button
                            onClick={() => setCharacter(prev => ({
                              ...prev,
                              expertise: prev.expertise.filter((_, i) => i !== index)
                            }))}
                            className="opacity-0 group-hover:opacity-100 hover:text-indigo-200 transition-opacity"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                      <button
                        onClick={() => {/* Add new expertise dialog */}}
                        className="px-3 py-1.5 border border-dashed border-indigo-500/30 text-indigo-400 rounded-full text-sm hover:bg-indigo-500/10 transition-colors flex items-center gap-1"
                      >
                        <Plus className="w-3 h-3" />
                        Add
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Character Traits
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {character.traits.map((trait, index) => (
                        <span
                          key={index}
                          className="px-3 py-1.5 bg-purple-500/20 text-purple-300 rounded-full text-sm flex items-center gap-1 group"
                        >
                          {trait}
                          <button
                            onClick={() => setCharacter(prev => ({
                              ...prev,
                              traits: prev.traits.filter((_, i) => i !== index)
                            }))}
                            className="opacity-0 group-hover:opacity-100 hover:text-purple-200 transition-opacity"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                      <button
                        onClick={() => {/* Add new trait dialog */}}
                        className="px-3 py-1.5 border border-dashed border-purple-500/30 text-purple-400 rounded-full text-sm hover:bg-purple-500/10 transition-colors flex items-center gap-1"
                      >
                        <Plus className="w-3 h-3" />
                        Add
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Communication & Preview */}
            <div className="space-y-6">
              <div className="bg-black/40 backdrop-blur-xl rounded-2xl border border-white/10 p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-emerald-400" />
                  Communication Style
                </h3>
                
                <div className="grid grid-cols-1 gap-3">
                  {communicationStyles.map(style => (
                    <label
                      key={style.id}
                      className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/5 cursor-pointer transition-colors"
                    >
                      <input
                        type="checkbox"
                        checked={character.style.communication.includes(style.id)}
                        onChange={(e) => {
                          setCharacter(prev => ({
                            ...prev,
                            style: {
                              ...prev.style,
                              communication: e.target.checked
                                ? [...prev.style.communication, style.id]
                                : prev.style.communication.filter(id => id !== style.id)
                            }
                          }));
                        }}
                        className="mt-1 form-checkbox text-indigo-500 rounded border-white/20 bg-black/30"
                      />
                      <div>
                        <p className="text-white font-medium">{style.label}</p>
                        <p className="text-sm text-gray-400">{style.description}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-br from-indigo-500/10 to-purple-500/10 backdrop-blur-xl rounded-2xl border border-indigo-500/20 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="w-5 h-5 text-indigo-400" />
                  <h3 className="text-lg font-semibold text-white">Preview</h3>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-xl">
                      {selectedTemplate.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">{character.name}</h4>
                      <p className="text-sm text-gray-400">AI Agent</p>
                    </div>
                  </div>
                  
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {character.bio || "Your agent's bio will appear here..."}
                  </p>

                  <div className="pt-4 border-t border-white/10">
                    <div className="flex flex-wrap gap-2">
                      {character.expertise.slice(0, 3).map((skill, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-indigo-500/20 text-indigo-300 rounded-full text-xs"
                        >
                          {skill}
                        </span>
                      ))}
                      {character.expertise.length > 3 && (
                        <span className="px-2 py-1 bg-indigo-500/20 text-indigo-300 rounded-full text-xs">
                          +{character.expertise.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}