import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  SelectValue,
  SelectTrigger,
  SelectItem,
  SelectContent,
  Select,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export function Wordform({ close }: { close: () => void }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue, // Function to set form values
  } = useForm();

  const onSubmit = (data: any) => {
    // Handle submission here
    console.log(data);
    toast.success("Word added successfully");
    close(); // Close the form after successful submission
  };

  const error = () => {
    Object.values(errors).forEach((error) => {
      let errorM;
      if (error?.message) {
        errorM = error.message.toString();
      } else {
        errorM = "An error occurred try again later";
      }
      toast.error(errorM);
    });
  };

  const handlePartOfSpeechChange = (selectedOption: string) => {
    setValue("partofspeech", selectedOption); // Update form state with selected part of speech
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex justify-between">
          Add New Word <Button onClick={close}>close</Button>
        </CardTitle>
        <CardDescription>
          Fill out the form to add a new word to the dictionary.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="grid gap-4" onSubmit={handleSubmit(onSubmit, error)}>
          <div className="grid gap-2">
            <Label htmlFor="word">Word</Label>
            <Input
              id="word"
              {...register("word", { required: "Word is required" })}
              placeholder="Enter the word"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="usage">Usage</Label>
            <Input
              id="usage"
              {...register("usage")}
              placeholder="Provide usage examples"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="partOfSpeech">Part of Speech</Label>
            <Select>
              <SelectTrigger>
                <SelectValue
                  // onChange={(e) => handlePartOfSpeechChange(e.target.addEventListener.apply[Symbol].)}
                  placeholder="Select part of speech"
                />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="noun">Noun</SelectItem>
                <SelectItem value="Pronoun">Pronoun</SelectItem>
                <SelectItem value="verb">Verb</SelectItem>
                <SelectItem value="adjective">Adjective</SelectItem>
                <SelectItem value="adverb">Adverb</SelectItem>
                <SelectItem value="Preposition">Preposition</SelectItem>
                <SelectItem value="Conjunction">Conjunction</SelectItem>
                <SelectItem value="Interjection">Interjection</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="synonym">Synonym</Label>
            <Input
              id="synonym"
              {...register("synonym")}
              placeholder="Enter synonyms"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="antonym">Antonym</Label>
            <Input
              id="antonym"
              {...register("antonym")}
              placeholder="Enter antonyms"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="meaning">Meaning</Label>
            <Textarea
              id="meaning"
              {...register("meaning", { required: "Meaning is required" })}
              placeholder="Provide the meaning"
            />
          </div>
          <Button type="submit">Save Word</Button>
        </form>
      </CardContent>
    </Card>
  );
}
