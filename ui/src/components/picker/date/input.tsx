import { useState } from "react";
import { MIconButton } from "../../button";
import { MTextField } from "../../textField";
import moment from "moment";
import { MTooltips } from "../../tooltips";


export default function MDatePickerInput() {
  const [value, setValue] = useState<string>(moment().format("MM/DD/YYYY"));
  const [open, setOpen] = useState(false);

  return (
    <MTooltips
      mode="manual"
      variant="rich"
      open={open}
      onOpenChange={(open) => setOpen(open)}
      sameWidth={true}
      trigger={
        <MTextField
          variant="outlined"
          suffixIcon={
            <MIconButton
              variant="icon"
              size="sm"
              onClick={() => setOpen(!open)}
            >
              <span className="material-icons">date_range</span>
            </MIconButton>
          }
          label="Date"
          helperText="MM/DD/YYYY"
          value={value}
        />
      }
    >
      
    </MTooltips>
  );
}
