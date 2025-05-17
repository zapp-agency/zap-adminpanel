import { createFormHook, createFormHookContexts } from "@tanstack/react-form"
import SubmitButton from "../components/ui/SubmitButton"
import NumberField from "../components/ui/NumberField"
import { TextField } from "../components/ui/TextField"

const { fieldContext, formContext } = createFormHookContexts()

// Allow us to bind components to the form to keep type safety but reduce production boilerplate
// Define this once to have a generator of consistent form instances throughout your app
export const { useAppForm } = createFormHook({
  fieldComponents: {
    TextField,
    NumberField,
  },
  formComponents: {
    SubmitButton,
  },
  fieldContext,
  formContext,
})