import { useState } from 'react';
import { useNavigate } from 'react-router';
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


const AddSchool = () => {
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        name: 'Royal Heritage Academy',
        subdomain: 'royal-heritage',
        code: 'RHA-2026',
        email: 'admin@royalheritage.edu',
        db_password: 'SecurePassword123!',
        subscription_tier: 'premium',
        subscriptionPeriod: 'yearly'
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);
        
        // --- MOCK PROVISIONING BYPASS ---
        // Simulating the database creation delay and auto-login as the new school admin
        setTimeout(() => {
            const mockSchoolAdminToken = 'demo-token-school-' + Math.random().toString(36).substr(2);
            const mockProfile = {
                id: 888,
                username: formData.code.toLowerCase() + '_admin',
                full_name: formData.name + " Admin",
                email: formData.email,
                role: 'school_admin',
                school_code: formData.code,
                is_first_login: false
            };

            localStorage.setItem('auth_token', mockSchoolAdminToken);
            localStorage.setItem('auth_user', JSON.stringify(mockProfile));
            localStorage.setItem('tenant_id', formData.code);
            
            setIsSubmitting(false);
            // Redirect directly to the school dashboard as requested
            window.location.href = '/school/dashboard';
        }, 1500);
        // --------------------------------
    };

    return (
        <>
            <BreadcrumbComp title="Add New School" items={BCrumb} />

            <div className="rounded-xl border border-border md:p-6 p-4">
                <h5 className="card-title">School & Admin Details</h5>

                <form onSubmit={handleSubmit} className="mt-6">
                    <div className="flex flex-col gap-6">
                        {error && (
                            <div className="p-4 bg-red-100 text-red-700 rounded-lg text-sm border border-red-200">
                                <p className="font-medium">{error.message}</p>
                                {error.isDisabledConflict && (
                                    <div className="mt-3">
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="sm"
                                            className="bg-white hover:bg-red-50 text-red-700 border-red-300"
                                            onClick={() => navigate('/super/utilities/schools/disabled')}
                                        >
                                            View Disabled Schools to Restore
                                        </Button>
                                    </div>
                                )}
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

                        {/* School Subdomain */}
                        <div>
                            <Label htmlFor="subdomain">
                                URL Subdomain <span className="text-error">*</span>
                            </Label>
                            <Input
                                id="subdomain"
                                type="text"
                                required
                                value={formData.subdomain}
                                onChange={(e) => setFormData({ ...formData, subdomain: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '') })}
                                placeholder="e.g. greenwood-high"
                                className="mt-2" />
                            <span className="text-xs text-gray-500 mt-1 d-block">This will be used for both the School URL and the physical Database Name.</span>
                        </div>

                        {/* School Code */}
                        <div>
                            <Label htmlFor="code">
                                School Identifier Code <span className="text-error">*</span>
                            </Label>
                            <Input
                                id="code"
                                type="text"
                                required
                                value={formData.code}
                                onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                                placeholder="e.g. GHS-001"
                                className="mt-2" />
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

                        {/* Tenant Database Password */}
                        <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                            <h4 className="text-sm font-semibold mb-3 text-primary">Database Credentials</h4>
                            <p className="text-xs mb-3 text-gray-500">The Database Host and User will default to your Master Registry values (`localhost` & `root`). You must set an encryption password for the Tenant Database.</p>
                            <Label htmlFor="dbPassword">
                                Database Encryption Password <span className="text-error">*</span>
                            </Label>
                            <Input
                                id="dbPassword"
                                type="password"
                                required
                                value={formData.db_password}
                                onChange={(e) => setFormData({ ...formData, db_password: e.target.value })}
                                placeholder="Enter secure password"
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
                                {isSubmitting ? 'Provisioning...' : 'Create & Provision School'}
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        </>);

};

export default AddSchool;