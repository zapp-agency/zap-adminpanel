import InputText from '@/components/ui/Inputs/InputText';
import { createFileRoute } from '@tanstack/react-router';
import { Home01Icon } from 'hugeicons-react';

export const Route = createFileRoute('/')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="p-xs borders-xs grid h-screen place-content-center bg-gray-700">
      <InputText
        variant="flat"
        title="Title"
        icon={<Home01Icon className="stroke-field-input-icon-normal size-6" />}
        placeholder="Placeholder"
        unit="Kg"
        caption='Caption'
        
      />
    </div>
  );
}
