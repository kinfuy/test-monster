import { SelectAreaInstance, SelectAreaProps } from '../components/SelectArea/selectArea.type';
import { SelectArea } from '../components/SelectArea';
let instence: SelectAreaInstance | undefined = undefined;
export const useSelectArea = () => {
  const createSelect = (options: SelectAreaProps) => {
    if (instence) closeSelect();
    instence = SelectArea({
      startPoint: options.startPoint,
      endPoint: options.endPoint,
    });
  };
  const closeSelect = () => {
    if (instence) {
      document.body.removeChild(instence.$el);
      instence = undefined;
    }
  };

  return {
    createSelect,
    closeSelect,
  };
};
