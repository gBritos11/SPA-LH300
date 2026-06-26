import { useState } from 'react';
import { X, PlaneTakeoff } from 'lucide-react';
import apiClient from '../../servicios/api.js';
import { toast } from 'react-hot-toast';

export const ModalCrearDestino = ({ isOpen, onClose }) => {
    const [budget, setBudget] = useState('');

    const [esForm, setEsForm] = useState({ name: '', country: '', location: '', description: '' });
    const [enForm, setEnForm] = useState({ name: '', country: '', location: '', description: '' });

    const [enviando, setEnviando] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setEnviando(true);

        const payload = {
            budget: Number(budget),
            translations: [
                { language: 'es', ...esForm },
                { language: 'en', ...enForm }
            ]
        };

        try {
            await apiClient.post('/destinos', payload);
            
            toast.success("¡Destino creado con éxito!");
            onClose();
            
            window.location.reload();
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.error || "Error al procesar la creación del destino");
        } finally {
            setEnviando(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4 animate-fade-in">
            <div className="bg-[#0e1e38] text-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl border border-white/10 flex flex-col">
                
                <div className="p-6 border-b border-white/10 flex justify-between items-center bg-[#0a1628]">
                    <div className="flex items-center gap-2">
                        <PlaneTakeoff className="text-orange-500" size={22} />
                        <h2 className="text-xl font-bold tracking-tight">Añadir Nuevo Destino</h2>
                    </div>
                    <button 
                        onClick={onClose} 
                        className="text-white/40 hover:text-white p-1.5 rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
                    >
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-5 overflow-y-auto">
                    
                    <div>
                        <label className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-2">
                            Presupuesto Estimado (USD)
                        </label>
                        <input 
                            type="number" 
                            required 
                            min="1"
                            value={budget} 
                            onChange={(e) => setBudget(e.target.value)} 
                            className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-orange-500 text-sm text-white transition-colors" 
                            placeholder="Ej: 350" 
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        
                        <div className="bg-white/5 p-4 rounded-xl border border-white/5 flex flex-col gap-3">
                            <h3 className="text-xs font-bold text-orange-400 uppercase tracking-widest mb-1 border-b border-white/10 pb-1">
                                Idioma: Español (ES)
                            </h3>
                            <input 
                                type="text" required placeholder="Nombre (ej: Bariloche)" 
                                value={esForm.name} onChange={(e) => setEsForm({...esForm, name: e.target.value})} 
                                className="w-full px-3 py-2 bg-[#0a1628] border border-white/10 rounded-lg text-xs text-white focus:outline-none focus:border-orange-500" 
                            />
                            <input 
                                type="text" required placeholder="País (ej: Argentina)" 
                                value={esForm.country} onChange={(e) => setEsForm({...esForm, country: e.target.value})} 
                                className="w-full px-3 py-2 bg-[#0a1628] border border-white/10 rounded-lg text-xs text-white focus:outline-none focus:border-orange-500" 
                            />
                            <input 
                                type="text" required placeholder="Ubicación (ej: Patagonia)" 
                                value={esForm.location} onChange={(e) => setEsForm({...esForm, location: e.target.value})} 
                                className="w-full px-3 py-2 bg-[#0a1628] border border-white/10 rounded-lg text-xs text-white focus:outline-none focus:border-orange-500" 
                            />
                            <textarea 
                                required placeholder="Descripción del destino en español..." rows="4" 
                                value={esForm.description} onChange={(e) => setEsForm({...esForm, description: e.target.value})} 
                                className="w-full px-3 py-2 bg-[#0a1628] border border-white/10 rounded-lg text-xs text-white focus:outline-none focus:border-orange-500 resize-none" 
                            />
                        </div>

                        <div className="bg-white/5 p-4 rounded-xl border border-white/5 flex flex-col gap-3">
                            <h3 className="text-xs font-bold text-orange-400 uppercase tracking-widest mb-1 border-b border-white/10 pb-1">
                                Language: English (EN)
                            </h3>
                            <input 
                                type="text" required placeholder="Name (e.g., Bariloche)" 
                                value={enForm.name} onChange={(e) => setEnForm({...enForm, name: e.target.value})} 
                                className="w-full px-3 py-2 bg-[#0a1628] border border-white/10 rounded-lg text-xs text-white focus:outline-none focus:border-orange-500" 
                            />
                            <input 
                                type="text" required placeholder="Country (e.g., Argentina)" 
                                value={enForm.country} onChange={(e) => setEnForm({...enForm, country: e.target.value})} 
                                className="w-full px-3 py-2 bg-[#0a1628] border border-white/10 rounded-lg text-xs text-white focus:outline-none focus:border-orange-500" 
                            />
                            <input 
                                type="text" required placeholder="Location (e.g., Patagonia)" 
                                value={enForm.location} onChange={(e) => setEnForm({...enForm, location: e.target.value})} 
                                className="w-full px-3 py-2 bg-[#0a1628] border border-white/10 rounded-lg text-xs text-white focus:outline-none focus:border-orange-500" 
                            />
                            <textarea 
                                required placeholder="Destination features description in English..." rows="4" 
                                value={enForm.description} onChange={(e) => setEnForm({...enForm, description: e.target.value})} 
                                className="w-full px-3 py-2 bg-[#0a1628] border border-white/10 rounded-lg text-xs text-white focus:outline-none focus:border-orange-500 resize-none" 
                            />
                        </div>

                    </div>

                    <div className="flex justify-end gap-3 border-t border-white/10 pt-4 mt-2 bg-[#0e1e38]">
                        <button 
                            type="button" 
                            onClick={onClose} 
                            className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-white/60 hover:text-white bg-white/5 hover:bg-white/10 rounded-xl transition-colors cursor-pointer"
                        >
                            Cancelar
                        </button>
                        <button 
                            type="submit" 
                            disabled={enviando} 
                            className="px-5 py-2 text-xs font-bold uppercase tracking-wider text-white bg-orange-500 hover:bg-orange-600 rounded-xl disabled:opacity-50 transition-colors shadow-md cursor-pointer"
                        >
                            {enviando ? 'Guardando...' : 'Guardar Destino'}
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
};