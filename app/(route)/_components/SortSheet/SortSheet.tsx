import { Button } from "@/app/_shared/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/_shared/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/app/_shared/components/ui/sheet";
import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";

export type SortOption =
  | "salary"
  | "overtime"
  | "paid_leave"
  | "age"
  | "duration"
  | "employees"
  | "revenue";

type SortSheetProps = {
  sortOption: SortOption | null;
  onSortChange: (option: SortOption) => void;
  sortOrder: "asc" | "desc";
  onSortOrderChange: (order: "asc" | "desc") => void;
};

export function SortSheet({
  sortOption,
  onSortChange,
  sortOrder,
  onSortOrderChange,
}: SortSheetProps) {
  // Active if not default (Default is Salary Descending, but let's just highlight if any sort is applied)
  // Actually, default IS salary desc.
  // We can show indicator if sort is NOT default?
  // User asked for "Sort Icon", clicking it opens UI.
  
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="h-10 w-10 shrink-0 hover:bg-muted/50 text-muted-foreground hover:text-foreground transition-colors">
          <ArrowUpDown className="h-4 w-4" />
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[90%] sm:max-w-[400px] px-3">
        <SheetHeader className="mb-6">
          <SheetTitle>並び替え設定</SheetTitle>
          <SheetDescription>
            企業の表示順序を変更します。
          </SheetDescription>
        </SheetHeader>

        <div className="space-y-6">
          <div className="space-y-3">
            <h3 className="font-semibold text-sm">項目 (Metric)</h3>
            <Select
              value={sortOption || ""}
              onValueChange={(value) => onSortChange(value as SortOption)}
            >
              <SelectTrigger>
                <SelectValue placeholder="項目を選択" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="salary">平均年収</SelectItem>
                <SelectItem value="overtime">月間残業</SelectItem>
                <SelectItem value="paid_leave">有休消化率</SelectItem>
                <SelectItem value="age">平均年齢</SelectItem>
                <SelectItem value="duration">平均勤続</SelectItem>
                <SelectItem value="employees">従業員数</SelectItem>
                <SelectItem value="revenue">売上高</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold text-sm">順序 (Order)</h3>
            <div className="flex rounded-md shadow-sm">
              <Button
                variant={sortOrder === "asc" ? "default" : "outline"}
                className="w-1/2 rounded-r-none"
                onClick={() => onSortOrderChange("asc")}
              >
                <ArrowUp className="w-4 h-4 mr-2" />
                昇順
                <span className="text-[10px] ml-1 font-normal opacity-80">(低い/古い)</span>
              </Button>
              <Button
                variant={sortOrder === "desc" ? "default" : "outline"}
                className="w-1/2 rounded-l-none"
                onClick={() => onSortOrderChange("desc")}
              >
                <ArrowDown className="w-4 h-4 mr-2" />
                降順
                <span className="text-[10px] ml-1 font-normal opacity-80">(高い/新しい)</span>
              </Button>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
