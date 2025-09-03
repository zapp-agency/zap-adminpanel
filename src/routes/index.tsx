import InputText from '@/components/ui/Inputs/InputText';
import { createFileRoute } from '@tanstack/react-router';
import { Home01Icon } from 'hugeicons-react';

export const Route = createFileRoute('/')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="p-xs borders-xs grid h-screen place-content-center">
      <InputText
        variant="solid"
        title="Title"
        icon={Home01Icon}
        placeholder="Placeholder"
        unit="Kg"
        caption='Caption'
        error='Error Message'
        disabled={false}
      />


    </div>
  );
}
