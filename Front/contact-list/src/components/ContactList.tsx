import { Box, FormControl, InputLabel, Select, MenuItem, TextField, Card } from "@mui/material";

interface ContactListProps {
  contactList: ContactUiModel[]
  onModelChanged: (contacts: ContactUiModel[]) => void;
}

export class ContactUiModel {
  constructor(
    public id: number = 0,
    public name: string,
    public contactType: number,
    public value: string = '',
    public personId: number = 0
  ) { }

  hasBeenSaved = () => this.id !== 0
}

export default function ContactList({ contactList, onModelChanged }: ContactListProps) {
  return (
    <>
      {contactList.map((contactUiModel) =>
        <Box mt={5}>
          <Card variant="outlined">
            <Box padding={2}>

              <Box sx={{ display: "flex", alignItems: "flex-end", width: "200px" }}>
                <FormControl fullWidth>
                  <InputLabel id="type-select-label">Type</InputLabel>
                  <Select
                    labelId="type-select-label"
                    id="type-select"
                    label="Type"
                  >
                    <MenuItem value={0}>Phone</MenuItem>
                    <MenuItem value={1}>E-Mail</MenuItem>
                    <MenuItem value={2}>Link</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <Box mt={5} sx={{ display: "flex", alignItems: "flex-end", width: "200px" }}>
                <TextField
                  id="name"
                  label="Name (optional): "
                  value={contactUiModel.name}
                  onChange={(event) => {
                    contactUiModel.name = event.target.value as string;
                    onModelChanged(contactList);
                  }}
                  variant="standard" />
              </Box>
              <Box mt={5} sx={{ display: "flex", alignItems: "flex-end", width: "200px" }}>
                <TextField
                  id="value"
                  label="Value: "
                  value={contactUiModel.value}
                  onChange={(event) => {
                    contactUiModel.value = event.target.value as string;
                    onModelChanged(contactList);
                  }}
                  variant="standard" />
              </Box>
            </Box>
          </Card>
        </Box>
      )}
    </>
  );
}