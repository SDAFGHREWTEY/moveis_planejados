import { useState } from 'react';
import { trpc } from '@/lib/trpc';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { Lock, Plus, Trash2, LogOut, Package, Layers, FileText } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function AdminPanel() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const utils = trpc.useUtils();
  const { data: authData, isLoading: authLoading } = trpc.admin.check.useQuery();
  const { data: produtos = [] } = trpc.produtos.list.useQuery(undefined, { enabled: authData?.isAdmin });
  const { data: materiais = [] } = trpc.materiais.list.useQuery(undefined, { enabled: authData?.isAdmin });
  const { data: pedidos = [] } = trpc.admin.pedidos.useQuery(undefined, { enabled: authData?.isAdmin });

  // Estado de formulário para novo móvel / edição
  const [produtoTipo, setProdutoTipo] = useState('');
  const [produtoTipoCalc, setProdutoTipoCalc] = useState('quadrado');
  const [produtoValorBase, setProdutoValorBase] = useState('');
  const [produtoDescricao, setProdutoDescricao] = useState('');

  // Estado de formulário para nova madeira / cor
  const [madeiraNome, setMadeiraNome] = useState('');
  const [madeiraMult, setMadeiraMult] = useState('');
  const [madeiraImg, setMadeiraImg] = useState('');
  const [madeiraDesc, setMadeiraDesc] = useState('');

  const loginMutation = trpc.admin.login.useMutation({
    onSuccess: () => {
      toast.success("Login de administrador efetuado com sucesso!");
      utils.admin.check.invalidate();
    },
    onError: () => {
      toast.error("Usuário ou senha incorretos.");
    },
  });

  const logoutMutation = trpc.admin.logout.useMutation({
    onSuccess: () => {
      toast.success("Logout realizado.");
      utils.admin.check.invalidate();
    },
  });

  const saveProdutoMutation = trpc.produtos.save.useMutation({
    onSuccess: () => {
      toast.success("Móvel salvo com sucesso!");
      utils.produtos.list.invalidate();
      setProdutoTipo('');
      setProdutoValorBase('');
      setProdutoDescricao('');
    },
    onError: (e) => toast.error("Erro: " + e.message),
  });

  const deleteProdutoMutation = trpc.produtos.delete.useMutation({
    onSuccess: () => {
      toast.success("Móvel removido!");
      utils.produtos.list.invalidate();
    },
  });

  const saveMadeiraMutation = trpc.materiais.save.useMutation({
    onSuccess: () => {
      toast.success("Madeira salva com sucesso!");
      utils.materiais.list.invalidate();
      setMadeiraNome('');
      setMadeiraMult('');
      setMadeiraImg('');
      setMadeiraDesc('');
    },
    onError: (e) => toast.error("Erro: " + e.message),
  });

  const deleteMadeiraMutation = trpc.materiais.delete.useMutation({
    onSuccess: () => {
      toast.success("Madeira removida!");
      utils.materiais.list.invalidate();
    },
  });

  if (authLoading) {
    return <div className="min-h-screen flex items-center justify-center">Carregando...</div>;
  }

  if (!authData?.isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
        <div className="max-w-md w-full bg-white rounded-xl shadow-2xl p-8">
          <div className="text-center mb-6">
            <div className="bg-amber-100 text-amber-800 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
              <Lock className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Painel Administrativo</h2>
            <p className="text-sm text-gray-500">Acesso restrito</p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              loginMutation.mutate({ username, password });
            }}
            className="space-y-4"
          >
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Usuário</label>
              <Input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Usuário"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Senha</label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Senha"
                required
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-amber-700 hover:bg-amber-800 text-white font-semibold py-3"
              disabled={loginMutation.isPending}
            >
              Entrar no Painel
            </Button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      {/* Top bar */}
      <header className="bg-gray-900 text-white py-4 px-6 shadow-md flex justify-between items-center">
        <div className="flex items-center gap-3">
          <span className="bg-amber-600 text-white p-2 rounded-lg font-bold">ADM</span>
          <h1 className="text-xl font-bold">Painel de Gerenciamento - MadeiraSobMedida</h1>
        </div>
        <div className="flex items-center gap-4">
          <a href="/" className="text-sm text-amber-300 hover:underline">Ver Site</a>
          <Button
            variant="outline"
            size="sm"
            onClick={() => logoutMutation.mutate()}
            className="text-white border-gray-700 hover:bg-gray-800"
          >
            <LogOut className="w-4 h-4 mr-2" /> Sair
          </Button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <Tabs defaultValue="produtos" className="space-y-6">
          <TabsList className="grid grid-cols-3 max-w-md bg-gray-200">
            <TabsTrigger value="produtos" className="flex items-center gap-2">
              <Package className="w-4 h-4" /> Móveis
            </TabsTrigger>
            <TabsTrigger value="madeiras" className="flex items-center gap-2">
              <Layers className="w-4 h-4" /> Madeiras
            </TabsTrigger>
            <TabsTrigger value="pedidos" className="flex items-center gap-2">
              <FileText className="w-4 h-4" /> Pedidos ({pedidos.length})
            </TabsTrigger>
          </TabsList>

          {/* GERENCIAR MÓVEIS */}
          <TabsContent value="produtos" className="space-y-6">
            <div className="bg-white rounded-xl shadow p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Adicionar / Editar Móvel</h2>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!produtoTipo || !produtoValorBase) return;
                  saveProdutoMutation.mutate({
                    tipo: produtoTipo,
                    tipoCalculo: produtoTipoCalc,
                    valorBase: parseFloat(produtoValorBase),
                    descricao: produtoDescricao,
                  });
                }}
                className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end"
              >
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nome do Móvel</label>
                  <Input
                    value={produtoTipo}
                    onChange={(e) => setProdutoTipo(e.target.value)}
                    placeholder="Ex: Guarda-Roupa / Mesa"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de Cálculo</label>
                  <Select value={produtoTipoCalc} onValueChange={setProdutoTipoCalc}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="quadrado">Quadradão (Altura x Comprimento)</SelectItem>
                      <SelectItem value="linear">Só Largura (Metro Quadrado)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Valor Base / M² (R$)</label>
                  <Input
                    type="number"
                    step="0.01"
                    value={produtoValorBase}
                    onChange={(e) => setProdutoValorBase(e.target.value)}
                    placeholder="Ex: 150.00"
                    required
                  />
                </div>
                <div>
                  <Button type="submit" className="w-full bg-amber-700 hover:bg-amber-800 text-white">
                    <Plus className="w-4 h-4 mr-2" /> Salvar Móvel
                  </Button>
                </div>
              </form>
            </div>

            <div className="bg-white rounded-xl shadow overflow-hidden">
              <h2 className="text-xl font-bold text-gray-900 p-6 border-b">Móveis Cadastrados</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-100 text-gray-700 text-sm">
                      <th className="p-4">ID</th>
                      <th className="p-4">Nome do Móvel</th>
                      <th className="p-4">Tipo de Cálculo</th>
                      <th className="p-4">Valor Base / M²</th>
                      <th className="p-4 text-right">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {produtos.map((p) => (
                      <tr key={p.id} className="hover:bg-gray-50">
                        <td className="p-4 font-mono text-sm">{p.id}</td>
                        <td className="p-4 font-semibold text-gray-900">{p.tipo}</td>
                        <td className="p-4">
                          <span className={`px-2 py-1 rounded text-xs font-semibold ${p.tipoCalculo === 'quadrado' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'}`}>
                            {p.tipoCalculo === 'quadrado' ? 'Quadradão (Altura x Comp)' : 'Só Largura (M²)'}
                          </span>
                        </td>
                        <td className="p-4 text-amber-700 font-bold">R$ {parseFloat(String(p.valorBase)).toFixed(2)}</td>
                        <td className="p-4 text-right">
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => deleteProdutoMutation.mutate({ id: p.id })}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>

          {/* GERENCIAR MADEIRAS */}
          <TabsContent value="madeiras" className="space-y-6">
            <div className="bg-white rounded-xl shadow p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Adicionar / Remover Madeira</h2>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!madeiraNome || !madeiraMult || !madeiraImg) return;
                  saveMadeiraMutation.mutate({
                    nome: madeiraNome,
                    multiplicador: parseFloat(madeiraMult),
                    urlImagem: madeiraImg,
                    descricao: madeiraDesc,
                  });
                }}
                className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end"
              >
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nome da Madeira</label>
                  <Input
                    value={madeiraNome}
                    onChange={(e) => setMadeiraNome(e.target.value)}
                    placeholder="Ex: Freijó, Imbuia"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Multiplicador (Fator)</label>
                  <Input
                    type="number"
                    step="0.01"
                    value={madeiraMult}
                    onChange={(e) => setMadeiraMult(e.target.value)}
                    placeholder="Ex: 1.30"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">URL da Imagem</label>
                  <Input
                    type="url"
                    value={madeiraImg}
                    onChange={(e) => setMadeiraImg(e.target.value)}
                    placeholder="https://images.unsplash.com/..."
                    required
                  />
                </div>
                <div>
                  <Button type="submit" className="w-full bg-amber-700 hover:bg-amber-800 text-white">
                    <Plus className="w-4 h-4 mr-2" /> Adicionar Madeira
                  </Button>
                </div>
              </form>
            </div>

            <div className="bg-white rounded-xl shadow overflow-hidden">
              <h2 className="text-xl font-bold text-gray-900 p-6 border-b">Madeiras Cadastradas</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
                {materiais.map((m) => (
                  <div key={m.id} className="bg-gray-50 border rounded-xl overflow-hidden shadow-sm flex flex-col">
                    <img src={m.urlImagem} alt={m.nome} className="w-full h-40 object-cover" />
                    <div className="p-4 flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="font-bold text-lg text-gray-900">{m.nome}</h3>
                        <p className="text-sm text-gray-600 mt-1">Multiplicador: x{m.multiplicador}</p>
                      </div>
                      <div className="mt-4 pt-4 border-t flex justify-end">
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => deleteMadeiraMutation.mutate({ id: m.id })}
                        >
                          <Trash2 className="w-4 h-4 mr-1" /> Remover
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* PEDIDOS DOS CLIENTES */}
          <TabsContent value="pedidos" className="space-y-6">
            <div className="bg-white rounded-xl shadow overflow-hidden">
              <h2 className="text-xl font-bold text-gray-900 p-6 border-b">Pedidos de Orçamento Recebidos</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-100 text-gray-700 text-sm">
                      <th className="p-4">ID</th>
                      <th className="p-4">Cliente</th>
                      <th className="p-4">Telefone</th>
                      <th className="p-4">Móvel</th>
                      <th className="p-4">Material</th>
                      <th className="p-4">Medidas</th>
                      <th className="p-4">Total</th>
                      <th className="p-4">Data</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {pedidos.map((ped) => (
                      <tr key={ped.id} className="hover:bg-gray-50 text-sm">
                        <td className="p-4 font-mono">{ped.id}</td>
                        <td className="p-4 font-semibold">{ped.nomeCliente || 'Anônimo'}</td>
                        <td className="p-4">{ped.telefoneCliente || '-'}</td>
                        <td className="p-4">{ped.tipoMovel}</td>
                        <td className="p-4">{ped.materialCor}</td>
                        <td className="p-4">
                          {ped.tipoCalculo === 'quadrado'
                            ? `Comp: ${ped.comprimento}cm, Alt: ${ped.altura}cm`
                            : `Largura: ${ped.largura}cm`}
                        </td>
                        <td className="p-4 font-bold text-amber-700">R$ {parseFloat(String(ped.precoTotal)).toFixed(2)}</td>
                        <td className="p-4 text-gray-500 text-xs">
                          {new Date(ped.createdAt).toLocaleString()}
                        </td>
                      </tr>
                    ))}
                    {pedidos.length === 0 && (
                      <tr>
                        <td colSpan={8} className="p-8 text-center text-gray-500">
                          Nenhum pedido de orçamento registrado ainda.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
