import { Button } from 'shadcn/components/ui/button';
import { useToast } from 'shadcn/components/ui/use-toast';
import { useAppDispatch } from '../hooks/store';
import { toggleExampleVisibility } from '../store/stores/example/slice';

export default function ExampleToggleButtons() {
  const { toast } = useToast();
  const dispatch = useAppDispatch();

  // const handleImportStoreData = useReadIpc({
  //   channel: IpcChannels.setStoreValue,
  //   failCallback: importStoreDataFailToast,
  //   successCallback: restartApp,
  // });

  return (
    <div className="flex gap-2">
      <Button
        variant="outline"
        onClick={() => {
          dispatch(toggleExampleVisibility());
        }}
      >
        Toggle
      </Button>{' '}
      <Button variant="outline" onClick={() => {}}>
        Toggle with Notification
      </Button>
      <Button
        variant="outline"
        onClick={() => {
          toast({
            description:
              'Successfully changed electron store value and redux value',
          });
        }}
      >
        Success Example
      </Button>
      <Button
        variant="outline"
        onClick={() => {
          toast({
            description:
              'Failed to change electron store value and redux value',
          });
        }}
      >
        Fail Example
      </Button>
    </div>
  );
}
