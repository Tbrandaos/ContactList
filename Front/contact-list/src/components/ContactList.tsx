import { Box, FormControl, InputLabel, Select, MenuItem, TextField, Card, Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteContactData } from "../api/PersonService";
interface ContactListProps {
  contactList: ContactUiModel[]
  onModelChanged: (contacts: ContactUiModel[]) => void;
}

export class ContactUiModel {
  constructor(
    public id: number = 0,
    public name: string = '',
    public contactType: number = 0,
    public value: string = '',
    public personId: number = 0
  ) { }

  hasBeenSaved = () => this.id !== 0
}

export default function ContactList({ contactList, onModelChanged }: ContactListProps) {
  const deleteContact = async (id: number, index: number) => {
    if (id !== 0) {
      await deleteContactData(id);
      const contactToRemove = contactList.findIndex((contact) => contact.id === id);
      contactList.splice(contactToRemove, 1);
    } else {
      deleteContactByIndex(index);
    }
    onModelChanged(contactList);
  }

  const deleteContactByIndex = (index: number) => {
    contactList.splice(index, 1);
    onModelChanged(contactList);
  }

  return (
    <>
      {contactList.map((contactUiModel, index) =>
        <Box key={contactUiModel.id} mt={5}>
          <Card variant="outlined">
            <Box padding={2}>
              <Box sx={{ display: "flex", alignItems: "flex-end", width: "200px" }}>
                <FormControl fullWidth>
                  <InputLabel id="type-select-label">Type</InputLabel>
                  <Select
                    labelId="type-select-label"
                    id="type-select"
                    label="Type"
                    value={contactUiModel.contactType}
                    onChange={(event) => {
                      const option = event.target.value as number;
                      contactUiModel.contactType = option;
                      onModelChanged(contactList);
                    }}
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
              <Box mt={5} sx={{ display: "flex", alignItems: "flex-end", width: "200px" }}>
                <Button
                  variant="outlined"
                  startIcon={<DeleteIcon />}
                  onClick={() => deleteContact(contactUiModel.id, index)}
                >
                  Delete
                </Button>
              </Box>
            </Box>
          </Card>
        </Box>
      )}
    </>
  );
}