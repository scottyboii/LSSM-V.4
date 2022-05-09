import type { Building } from 'typings/Building';
import type { Vehicle } from 'typings/Vehicle';
import type VueI18n from 'vue-i18n';

interface VehicleWithBuilding extends Vehicle {
    building: string | undefined;
}

export interface VehicleList {
    vehicleTypeNames: Record<number, string>;
    vehiclesWithBuildings: VehicleWithBuilding[];
    buildings: Building[];
    search: string;
    sort: string;
    sortDir: string;
    resolveLinkClass: string;
    resolving: number | null;
}

export interface VehicleListMethods {
    setSort(type: string): void;
    toggleFMS(vehicle: Vehicle): void;
    $m(key: string, args?: Record<string, unknown>): VueI18n.TranslateResult;
    startResolve(type: 'building' | 'mission', id: number): void;
    endResolve(): void;
    resolveMission(id: number): string;
}

export interface VehicleListComputed {
    vehiclesFiltered: Vehicle[];
    vehiclesSorted: Vehicle[];
}

export interface VehicleListProps {
    title: string;
    vehicles: Vehicle[];
}
