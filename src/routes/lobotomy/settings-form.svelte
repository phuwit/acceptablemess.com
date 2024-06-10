<script lang="ts">
  import {
    type Infer,
    type SuperValidated,
    superForm
  } from "sveltekit-superforms";
  import { zodClient } from "sveltekit-superforms/adapters";
  import { toast } from "svelte-sonner";
  import * as Form from "$lib/components/ui/form/index.js";
  import { Switch } from "$lib/components/ui/switch/index.js";
  import { formSchema, type FormSchema } from "./schema";
  export let data: SuperValidated<Infer<FormSchema>>;

  const form = superForm(data, {
    validators: zodClient(formSchema),
    onUpdated: ({ form: f }) => {
      if (f.valid) {
        toast.success(`You submitted ${JSON.stringify(f.data, null, 2)}`);
      } else {
        toast.error("Please fix the errors in the form.");
      }
    }
  });

  const { form: formData, enhance } = form;
</script>

<form class="w-fit space-y-6">
  <fieldset>
    <!-- <legend class="mb-4 text-lg font-medium"> settings </legend> -->
    <div class="space-y-4">
      <Form.Field
        {form}
        name="youtube_external"
        class="flex flex-row items-center justify-between rounded-lg border p-4"
      >
        <Form.Control let:attrs>
          <div class="space-y-0.5">
            <Form.Label>open youtube links externally</Form.Label>
            <Form.Description>
              open youtube links in new tab, instead of an embed.
            </Form.Description>
          </div>
          <Switch
           class='ml-4'
            includeInput
            {...attrs}
            bind:checked={$formData.youtube_external}
          />
        </Form.Control>
      </Form.Field>
    </div>
  </fieldset>
</form>