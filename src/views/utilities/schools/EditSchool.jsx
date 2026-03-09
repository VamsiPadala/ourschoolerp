import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import BreadcrumbComp from 'src/layouts/full/shared/breadcrumb/BreadcrumbComp';
import { Button } from 'src/components/ui/button';
import { Input } from 'src/components/ui/input';
import { Label } from 'src/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from
    'src/components/ui/select';
import { RadioGroup, RadioGroupItem } from 'src/components/ui/radio-group';
import { api } from 'src/lib/api-client';

const BCrumb = [
    {
        to: '/',
        title: 'Home'
    },
    {
        to: '/super/utilities/schools',
        title: 'Schools'
    },
    {
        title: 'Add New School'
    }];


const EditSchool = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        subdomain: '',
        code: '',
        email: '',
        db_password: '',
        subscription_tier: 'basic',
        subscriptionPeriod: 'monthly'
    });

    useEffect(() => {
        const fetchSchool = async () => {
            try {
                const response = await api.get(`/master/schools/${id}`);
                if (response) {
                    setFormData({
                        name: response.name || '',
                        subdomain: response.subdomain || '',
                        code: response.code || '',
                        email: response.email || '',
                        db_password: '', // Leave blank unless they want to change it (or hide it if it can't be changed)
                        subscription_tier: response.subscription_tier || 'basic',
                        subscriptionPeriod: 'monthly'
                    });
                }
            } catch (err) {
                console.error('Failed to fetch school details:', err);
                setError('Could not load school data');
            } finally {
                setIsLoading(false);
            }
        };

        if (id) {
            fetchSchool();
        }
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);
        try {
            const payload = {
                name: formData.name,
                email: formData.email,
                subscription_tier: formData.subscription_tier,
            };

            await api.put(`/master/schools/${id}`, payload);
            navigate('/super/utilities/schools');
        } catch (err) {
            console.error('Failed to provision school:', err);
            setError(err.response?.data?.detail || "Failed to create school and provision database");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <BreadcrumbComp title="Edit School" items={BCrumb} />

            <div className="rounded-xl border border-border md:p-6 p-4">
                <h5 className="card-title">Edit School Details</h5>

                {isLoading ? (
                    <div className="p-8 text-center text-gray-500">Loading school details...</div>
                ) : (
                    <form onSubmit={handleSubmit} className="mt-6">
                        <div className="flex flex-col gap-6">
                            {error && (
                                <div className="p-3 bg-red-100 text-red-700 rounded-md text-sm">
                                    {error}
                                </div>
                            )}
                            {/* School Name */}
                            <div>
                                <Label htmlFor="schoolName">
                                    School Name <span className="text-error">*</span>
                                </Label>
                                <Input
                                    id="schoolName"
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    placeholder="Enter school name"
                                    className="mt-2" />
                            </div>

                            {/* School Subdomain (Read Only) */}
                            <div>
                                <Label htmlFor="subdomain">
                                    URL Subdomain
                                </Label>
                                <Input
                                    id="subdomain"
                                    type="text"
                                    disabled
                                    value={formData.subdomain}
                                    className="mt-2 bg-gray-50 dark:bg-gray-800" />
                            </div>

                            {/* School Code (Read Only) */}
                            <div>
                                <Label htmlFor="code">
                                    School Identifier Code
                                </Label>
                                <Input
                                    id="code"
                                    type="text"
                                    disabled
                                    value={formData.code}
                                    className="mt-2 bg-gray-50 dark:bg-gray-800" />
                            </div>

                            {/* Admin Email */}
                            <div>
                                <Label htmlFor="adminEmail">
                                    Primary Contact Email <span className="text-error">*</span>
                                </Label>
                                <Input
                                    id="adminEmail"
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    placeholder="Enter contact email"
                                    className="mt-2" />
                            </div>

                            {/* Subscription Tier */}
                            <div>
                                <Label htmlFor="subscriptionPlan">
                                    Subscription Tier <span className="text-error">*</span>
                                </Label>
                                <Select
                                    required
                                    value={formData.subscription_tier}
                                    onValueChange={(value) => setFormData({ ...formData, subscription_tier: value })}>

                                    <SelectTrigger className="mt-2 w-full">
                                        <SelectValue placeholder="-- Select a Tier --" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="basic">Basic</SelectItem>
                                        <SelectItem value="standard">Standard</SelectItem>
                                        <SelectItem value="premium">Premium</SelectItem>
                                        <SelectItem value="enterprise">Enterprise</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Initial Subscription Period */}
                            <div>
                                <Label>
                                    Initial Subscription Period <span className="text-error">*</span>
                                </Label>
                                <RadioGroup
                                    value={formData.subscriptionPeriod}
                                    onValueChange={(value) => setFormData({ ...formData, subscriptionPeriod: value })}
                                    className="mt-2 flex gap-6">

                                    <div className="flex items-center gap-2">
                                        <RadioGroupItem value="monthly" id="monthly" />
                                        <Label htmlFor="monthly" className="font-normal cursor-pointer">
                                            Monthly
                                        </Label>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <RadioGroupItem value="yearly" id="yearly" />
                                        <Label htmlFor="yearly" className="font-normal cursor-pointer">
                                            Yearly
                                        </Label>
                                    </div>
                                </RadioGroup>
                            </div>

                            {/* Submit Button */}
                            <div className="pt-4">
                                <Button type="submit" disabled={isSubmitting} className="px-8">
                                    {isSubmitting ? 'Saving...' : 'Save Changes'}
                                </Button>
                            </div>
                        </div>
                    </form>
                )}
            </div>
        </>);

};

export default EditSchool;