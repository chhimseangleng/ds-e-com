import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';

interface Category {
    id: string;
    name: string;
}

interface Props {
    categories: Category[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Categories',
        href: '/admin/product-categories',
    },
];

export default function Index({ categories }: Props) {
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [editingCategory, setEditingCategory] = useState<Category | null>(null);
    const [deletingCategory, setDeletingCategory] = useState<Category | null>(null);

    const createForm = useForm({
        name: '',
    });

    const editForm = useForm({
        name: '',
    });

    const handleCreate = (e: React.FormEvent) => {
        e.preventDefault();
        createForm.post('/admin/product-categories', {
            onSuccess: () => {
                createForm.reset();
                setIsCreateOpen(false);
            },
        });
    };

    const handleEdit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingCategory) return;

        editForm.put(`/admin/product-categories/${editingCategory.id}`, {
            onSuccess: () => {
                editForm.reset();
                setEditingCategory(null);
            },
        });
    };

    const handleDelete = () => {
        if (!deletingCategory) return;

        editForm.delete(`/admin/product-categories/${deletingCategory.id}`, {
            onSuccess: () => {
                setDeletingCategory(null);
            },
        });
    };

    const openEdit = (category: Category) => {
        setEditingCategory(category);
        editForm.setData('name', category.name);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Admin - Categories" />

            <div className="p-6">
                <div className="mb-6 flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Product Categories</h1>
                    <Button onClick={() => setIsCreateOpen(true)} className="bg-blue-600 hover:bg-blue-700">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Category
                    </Button>
                </div>

                <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Name
                                </th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {categories.map((category) => (
                                <tr key={category.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">{category.name}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => openEdit(category)}
                                            className="text-blue-600 hover:text-blue-900 hover:bg-blue-50 mr-2"
                                        >
                                            <Pencil className="w-4 h-4" />
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => setDeletingCategory(category)}
                                            className="text-red-600 hover:text-red-900 hover:bg-red-50"
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

            {/* Create Dialog */}
            <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Add New Category</DialogTitle>
                        <DialogDescription>
                            Create a new product category.
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleCreate}>
                        <div className="space-y-4 py-4">
                            <div className="space-y-2">
                                <Label htmlFor="create-name">Category Name</Label>
                                <Input
                                    id="create-name"
                                    value={createForm.data.name}
                                    onChange={e => createForm.setData('name', e.target.value)}
                                    placeholder="Enter category name"
                                    className={createForm.errors.name ? 'border-red-500' : ''}
                                />
                                {createForm.errors.name && (
                                    <p className="text-sm text-red-500">{createForm.errors.name}</p>
                                )}
                            </div>
                        </div>
                        <DialogFooter>
                            <Button type="button" variant="ghost" onClick={() => setIsCreateOpen(false)}>
                                Cancel
                            </Button>
                            <Button type="submit" disabled={createForm.processing} className="bg-blue-600 hover:bg-blue-700">
                                Create
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            {/* Edit Dialog */}
            <Dialog open={!!editingCategory} onOpenChange={(open) => !open && setEditingCategory(null)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edit Category</DialogTitle>
                        <DialogDescription>
                            Update the category name.
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleEdit}>
                        <div className="space-y-4 py-4">
                            <div className="space-y-2">
                                <Label htmlFor="edit-name">Category Name</Label>
                                <Input
                                    id="edit-name"
                                    value={editForm.data.name}
                                    onChange={e => editForm.setData('name', e.target.value)}
                                    placeholder="Enter category name"
                                    className={editForm.errors.name ? 'border-red-500' : ''}
                                />
                                {editForm.errors.name && (
                                    <p className="text-sm text-red-500">{editForm.errors.name}</p>
                                )}
                            </div>
                        </div>
                        <DialogFooter>
                            <Button type="button" variant="ghost" onClick={() => setEditingCategory(null)}>
                                Cancel
                            </Button>
                            <Button type="submit" disabled={editForm.processing} className="bg-blue-600 hover:bg-blue-700">
                                Update
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            {/* Delete Alert Dialog */}
            <AlertDialog open={!!deletingCategory} onOpenChange={(open: boolean) => !open && setDeletingCategory(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This will permanently delete the category "{deletingCategory?.name}".
                            This action cannot be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleDelete}
                            className="bg-red-600 hover:bg-red-700"
                        >
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </AppLayout>
    );
}
