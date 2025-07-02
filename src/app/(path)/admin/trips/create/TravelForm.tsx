"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Users, Plane, Heart, DollarSign } from "lucide-react";
import { countries } from "@/constants/country";
import ReactSelect from "react-select";
import {
  budgetOptions,
  groupTypes,
  interestOptions,
  travelStyles,
} from "@/constants";
import MyMap from "./MyMap";
import { useState } from "react";
import Image from "next/image";
import { useUser } from "@/context/UserContext";

// Form validation schema
const formSchema = z.object({
  duration: z
    .string()
    .min(1, "Please enter duration")
    .refine((val) => {
      const num = parseInt(val);
      return num > 0 && num <= 365;
    }, "Duration must be between 1 and 365 days"),
  groupType: z.string().min(1, "Please select a group type"),
  travelStyle: z.string().min(1, "Please select your travel style"),
  interests: z.string().min(1, "Please select your interests"),
  budget: z.string().min(1, "Please select your budget preference"),
  location: z.string().optional(),
  country: z
    .object({
      value: z.string(),
      label: z.string(),
      data: z.object({
        flag: z.string(),
        coordinates: z.object({
          lat: z.number(),
          lng: z.number(),
        }),
      }),
    })
    .nullable(),
});

type FormData = z.infer<typeof formSchema>;

export default function TravelForm() {
  const user = useUser();
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      duration: "",
      groupType: "",
      travelStyle: "",
      interests: "",
      budget: "",
      location: "Melbourne",
      country: null,
    },
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log({ userId: user?.$id, ...data });
    setLoading(false);
  };

  const [latlan, setLatLan] = useState<[number, number]>([20, 77]);
  const [loading, setLoading] = useState(false);

  return (
    <div className="max-w-md w-full mx-auto p-6 bg-white shadow border">
      <Form {...form}>
        <div className="space-y-4">
          {/* Country Selection */}
          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <Plane className="w-4 h-4" />
                  Select Country
                </FormLabel>
                <FormControl>
                  <ReactSelect
                    value={field.value}
                    options={countries}
                    placeholder="Please Select a Dreamy Country"
                    onChange={(selected) => {
                      field.onChange(selected);
                      setLatLan([
                        selected?.data?.coordinates?.lat
                          ? selected?.data?.coordinates?.lat
                          : 9,
                        selected?.data?.coordinates?.lng
                          ? selected?.data?.coordinates?.lng
                          : 0,
                      ]);
                    }}
                    isSearchable
                    isClearable
                    className="w-full rounded-4xl shadow-none text-sm border border-zinc-100/10"
                    menuPortalTarget={
                      typeof window !== "undefined" ? document.body : undefined
                    }
                    styles={{ menuPortal: (base) => ({ ...base, zIndex: 60 }) }}
                    formatOptionLabel={({ label, data }) => (
                      <div className="flex items-center gap-2">
                        <Image
                          src={data.flag}
                          alt={label}
                          width={10}
                          height={10}
                          className="w-5 h-5 rounded-full"
                        />
                        <span>{label}</span>
                      </div>
                    )}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Duration */}
          <FormField
            control={form.control}
            name="duration"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <Calendar className="w-4 h-4" />
                  Duration
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter number of days (e.g. 5, 12)"
                    {...field}
                    type="number"
                    min="1"
                    max="365"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Group Type */}
          <FormField
            control={form.control}
            name="groupType"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <Users className="w-4 h-4" />
                  Group Type
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a group type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {groupTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Travel Style */}
          <FormField
            control={form.control}
            name="travelStyle"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <Plane className="w-4 h-4" />
                  Travel style
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select your travel style" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {travelStyles.map((style) => (
                      <SelectItem key={style} value={style}>
                        {style}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Interests */}
          <FormField
            control={form.control}
            name="interests"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <Heart className="w-4 h-4" />
                  Interests
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select your interests" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {interestOptions.map((interest) => (
                      <SelectItem key={interest} value={interest}>
                        {interest}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Budget Estimate */}
          <FormField
            control={form.control}
            name="budget"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <DollarSign className="w-4 h-4" />
                  Budget Estimate
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select your budget preference" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="z-[70]">
                    {budgetOptions.map((budget) => (
                      <SelectItem key={budget} value={budget}>
                        {budget}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Location on Map */}
          <div className="space-y-3">
            <FormLabel className="text-sm font-medium text-gray-700">
              Location on map
            </FormLabel>
            <Card
              className="w-full h-52 bg-gray-100 p-0"
              style={{ position: "relative", zIndex: 0 }}
            >
              <CardContent className="w-full p-0">
                <MyMap position={latlan} />
              </CardContent>
            </Card>
          </div>

          {/* Submit Button */}
          <Button
            onClick={form.handleSubmit(onSubmit)}
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium"
          >
            ✈️ Generate a trip
            {loading && (
              <Image
                src={"/assets/icons/loader.svg"}
                alt="loader"
                width={14}
                height={14}
                className="animate-spin"
              />
            )}
          </Button>
        </div>
      </Form>
    </div>
  );
}
